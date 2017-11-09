let pool = require('./pool');

module.exports={
    //1. 获取所有题目类型
    getAllSubjectType(){
        let sql = "select * from tbl_exam_subjecttype";
        return pool.execute(sql);
    },
    //2. 获取所有题目难度级别
    getAllSubjectLevel(){
        let sql = "select * from tbl_exam_subjectlevel";
        return pool.execute(sql);
    },
    //3. 获取所有的方向
    getAllDepartmentes(){
        let sql = "select * from tbl_exam_department";
        return pool.execute(sql);
    },
    // 4. 获取所有的知识点
    getAllTopics(){
        let sql = "select * from tbl_exam_topic";
        return pool.execute(sql);
    },
    // 5. 根据方向id获取该方向下的所有知识点
    getDepartmentTopics(id){
        let sql ="select t.id,t.title from tbl_exam_topic as t where id = "+id;
        return pool.execute(sql);      
    },
    //6. 保存题目信息//未测
    //insert into tbl_exam_subject values('6', '中国馆', '', '通过', '通过', '2017-01-13 09:31:51', '2', '3', '1', '2',null);
    saveSubject(subject){
        //console.log('猪',subject);
        let date = new Date();
        date = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
        let sql = "insert into tbl_exam_subject values(null,'"
            +subject['analysis']+"','"
            +subject['answer']+"','"
            +'未审核'+"','"
            +subject['stem']+"','"
            +date+"',"
            +subject['department.id']+","
            +subject['subjectLevel.id']+","
            +subject['subjectType.id']+","
            +subject['topic.id']+","
            +null+")";
        return pool.execute(sql);
    },
    saveChoice(subject,id){
        for(var key in subject['choiceContent[]']){
            //console.log('插入一个选项');
            let sql = "insert into tbl_exam_choice values(null,'"
                +subject['choiceContent[]'][key]+"',"
                +subject['choiceCorrect[]'][key]+","
                +id+")";
            pool.execute(sql);
        }
    },
    //7. 查询所有题目信息
    getAllSubjects(subject){
        //console.log(subject);
        let type_id = JSON.parse(subject["type"]);
        let level_id = JSON.parse(subject["level"]);
        let direct_id = JSON.parse(subject["direct"]);
        let topic_id = JSON.parse(subject["topic"]);
        //console.log(type_id,level_id,direct_id,topic_id);
        let sql = "select * from tbl_exam_subject where subjectType_id in ("
            +type_id.join()+") and subjectLevel_id in ("
            +level_id.join()+") and department_id in ("
            +direct_id.join()+") and topic_id in ("
            +topic_id.join()+")";
        //console.log(sql);
        return pool.execute(sql);
    },
    //8. 删除
    delSubject(subject){
        let id = subject['subject.id'];
        console.log('猪',id)
        let sql = "delete  from tbl_exam_subject  where id = "
                +id;
        return pool.execute(sql);
    },
    //9. 审核
    checkSubject(subject){
        let checkState = subject['subject.checkState'];
        let id = subject['subject.id'];
        let sql = "update tbl_exam_subject set checkState = '"
            +checkState+"' where id = "
            +id;
        //console.log(sql);
        return pool.execute(sql);
    },
    //10. 获取所有的答案选项（根据id）
    getSubjectChoice(id){
        let sql = "select * from tbl_exam_choice where subject_id = "+id;
        return pool.execute(sql);
    },
    //11. 模糊查询题干（keys）
    querySubject(keys){
        let sql = "select * from tbl_exam_subject where stem like '%"+keys+"%'";
        return pool.execute(sql);
    },
    //12. 根据id获取题目类型
    getTypeById(id){
        let sql = "select * from tbl_exam_subjecttype where id = "+id;
        return pool.execute(sql);
    },
    //13. 根据id获取题目难度
    getLevelById(id){
        let sql = "select * from tbl_exam_subjectlevel where id = "+id;
        return pool.execute(sql);
    }
}