let mysql = require('mysql');
let pool = global.pool;
if(!pool){
    pool=mysql.createPool({
        database:'exam',
        user:'root',
        password:'root',    
    })
    global.pool = pool;
}

function getConnection(){
    return new Promise(function(resolve,reject){
        pool.getConnection(function(err,connection){
            if(err){
                reject(err);
            }else{
                resolve(connection);
            }
        })
    });
}
function execute(sql){
    return new Promise(function(resolve,reject){
        let conn =0;
        getConnection().then(function(connection){
            conn = connection;
            connection.query(sql,function(err,results){
                if(err){
                    reject(err);
                }else{
                    resolve(results);
                }
            })
        }).catch(function(err){
            reject(err);
        }).finally(function(){
            conn.release();
            console.log("释放成功");
        })
    })
}

module.exports={
    execute
}