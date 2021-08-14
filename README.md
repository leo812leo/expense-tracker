## :money_with_wings: Expense Tracker
使用 Node.js + Express + express-handlebars + passport.js + mongoDB 打造的家庭開支記錄網頁。

You can see on [heroku](https://desolate-meadow-87848.herokuapp.com/)
## Getting Started

本專案已經設定 npm script, 因此可以直接透過 npm install 與 npm run 的方式來執行。

### Development environment

| Package            | Version  |
| ------------------ | -------- |
| mac Big Sur        | 11.4     |
| VS code            | 1.57.1   |
| Node.js            | v14.17.1 |
| Nodemon            | 2.0.7    |
| Express            | 4.17.1   |
| Express-handlebars | 5.3.2    |
| Mongoose           | 5.13.2   |
| MongoDB            | 4.2.5    |
| method-override    | 3.0.0    |
| standard           | 16.0.3   |
| passport           | 0.4.1    |
| passport-local     | 1.0.0    |
| passport-facebook  | 3.0.0    |
| dotenv             | 10.0.0   |
| bcryptjs           | 2.4.3    |
| connect-flash      | 0.1.1    |

### Description

- 使用者可以從首頁瀏覽總花費金額及所有支出 : 分類、店家、名稱、日期、金額
- 使用者可以點擊右方按鈕進行更多操作 : 編輯、刪除
- 使用者可以同時根據「類別」與「月份」進行支出的篩選
- 使用者點擊編輯時會自動帶入過往資訊
- 使用者可以註冊帳號，註冊的資料包括：名字、email、密碼、確認密碼。
- 如果使用者已經註冊過、沒填寫必填欄位、或是密碼輸入錯誤，就註冊失敗，並回應給使用者錯誤訊息。
- 使用者也可以透過 Facebook Login 直接登入。
- 使用者必須登入才能使用支出清單，如果沒登入，會被導向登入頁面。
- 使用者登入後，可以建立並管理專屬自己的一個支出清單
- 使用者登出、註冊失敗、或登入失敗時，使用者都會在畫面上看到正確而清楚的系統訊息。
- 使用者的密碼使用 bcrypt 來處理。
- 使用種從資料庫中隨機新增使用者籍資料，測試使用者三人，資料各五筆

### Installing

1. 透過 https 取得此專案

```bash
https://github.com/leo812leo/expense-tracker.git
```

2. 安裝 node module

```bash
cd expense-tracker
npm install
```

3. 根據需求修改.example 的內容並更換其檔名

```bash
$ vim .example
(註:存檔離開vim指令為 :wq)
$ mv .example .env
```

4. 載入 Record Seeds

本專案需在 local 建立 MongoDB 並且使用預設 port 3000。

```bash
$ npm run seed
```

5. 透過 npm 在 local 啟動 web server

```bash
$ npm run dev
Express is running on http://localhost:3000
```

6. 透過 Browser 打開 [http://localhost:3000](http://localhost:3000)

## 測試資料
- 人員資料

| name            | email    | password |
| --------------- | -------- |----------|
| root          | root@example.com     | 12345678  |
| root2         | root2@example.com   |  123 |
| root3         | root3@example.com   |  456 |


支出資料及類別資料，詳見 models/seeds/seed.json
