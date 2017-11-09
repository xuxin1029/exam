let express = require('express');

let DB = require('../db/DB');

let route = express.Router();

//1. 获取所有题目类型
route.get('/getAllSubjectType',(req,resp)=>{
    DB.getAllSubjectType().then((data)=>{
        resp.send(data);
    }).catch((err)=>{
        resp.send(err);
    })
})
//2. 获取所有题目难度级别
route.get('/getAllSubjectLevel',(req,resp)=>{
    DB.getAllSubjectLevel().then((data)=>{
        resp.send(data);
    }).catch((err)=>{
        resp.send(err);
    })
})
//3. 获取所有的方向
route.get('/getAllDepartmentes',(req,resp)=>{
    DB.getAllDepartmentes().then((data)=>{
        resp.send(data);
    }).catch((err)=>{
        resp.send(err);
    })
})
//4. 获取所有的知识点
route.get('/getAllTopics',(req,resp)=>{
    DB.getAllTopics().then((data)=>{
        resp.send(data);
    }).catch((err)=>{
        resp.send(err);
    })
})
//5. 根据方向id获取该方向下的所有知识点
route.get('/getDepartmentTopics',(req,resp)=>{
    DB.getDepartmentTopics(req.query.id).then((data)=>{
        resp.send(data);
    }).catch((err)=>{
        resp.send(err);
    })
})

//6. 保存题目信息//未测
route.post('/saveSubject',(req,resp)=>{
    DB.saveSubject(req.body).then((data)=>{
        //console.log(data['insertId']);
        if(req.body['subjectType.id'] != 3){
            DB.saveChoice(req.body,data['insertId']);
        }
        resp.send(data);
    }).catch((err)=>{
        resp.send(err);
    })
})
//7. 查询所有题目信息
route.post('/getAllSubjects',(req,resp)=>{
    DB.getAllSubjects(req.body).then((data)=>{
        resp.send(data);
    }).catch((err)=>{
        resp.send(err);
    })
})
//8. 删除
route.post('/delSubject',(req,resp)=>{
    DB.delSubject(req.body).then((data)=>{
        resp.send(data);
    }).catch((err)=>{
        resp.send(err);
    })
})
//9. 审核
route.post('/checkSubject',(req,resp)=>{
    DB.checkSubject(req.body).then((data)=>{
        resp.send(data);
    }).catch((err)=>{
        resp.send(err);
    })
})
//10. 获取所有的答案选项（根据id）
route.post('/getSubjectChoice',(req,resp)=>{
    DB.getSubjectChoice(req.body.id).then((data)=>{
        resp.send(data);
    }).catch((err)=>{
        resp.send(err);
    })
})
//11. 模糊查询题干（keys）
route.get('/querySubject/:keys',(req,resp)=>{
    console.log(req.params);
    DB.querySubject(req.params.keys).then((data)=>{
        resp.send(data);
    }).catch((err)=>{
        resp.send(err);
    })
})
//12. 根据id获取题目类型
route.get('/getTypeById',(req,resp)=>{
    console.log('111',req.query.id);
    DB.getTypeById(req.query.id).then((data)=>{
        resp.send(data);
    }).catch((err)=>{
        resp.send(err);
    })
})
//13. 根据id获取题目难度
route.get('/getLevelById',(req,resp)=>{
    DB.getLevelById(req.query.id).then((data)=>{
        resp.send(data);
    }).catch((err)=>{
        resp.send(err);
    })
})
module.exports = route;