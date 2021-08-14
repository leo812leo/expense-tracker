
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Category = require('../category')
const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678',
  record: [
    ['午餐', '2019/04/23', '餐飲食品', 60, '鐵路便當'],
    ['晚餐', '2019/04/23', '餐飲食品', 60, '池上便當'],
    ['捷運', '2019/04/23', '交通出行', 120, '南京復興站'],
    ['電影：驚奇隊長', '2019/04/23', '休閒娛樂', 120, '國賓影城'],
    ['租金', '2019/04/01', '家居物業', 25000, '房東'],
    ['午餐', '2020/07/31', '餐飲食品', 70, '排骨王'],
    ['晚餐', '2020/08/01', '餐飲食品', 90, '雞腿王']
  ]
}

db.once('open', () => {
  const categoryList = {}

  bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => Category.find()
      .lean()
      .then(categories => {
        categories.forEach(category => {
          categoryList[category.title] = category._id
        })
        return SEED_USER.record.map(record => ({
          name: record[0],
          date: record[1],
          category: categoryList[record[2]],
          amount: record[3],
          merchant: record[4],
          userId: user._id
        }))
      })
      .then(recordSeedData => {
        Record.create(recordSeedData)
          .then(() => {
            console.log('Record seeder done.')
            return db.close()
          })
      })
    )
    .catch(error => console.error(error))
})