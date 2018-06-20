A Koa Server for ifun web, use Mongo to store data.

为了避免并发导致的数据一致性问题, Mongo ifun 的user表要创建name的unique index
```shell
// do this step after insert one document (register a user)
db.user.createIndex({"name": 1}, {"background": true, "unique":true, "name": "nameIndex"})
```