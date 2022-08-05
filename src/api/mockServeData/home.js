import Mock from 'mockjs'

let List =[]
export default {
    getStatisticalData:()=>{
        for( let i = 0; i<7; i++){
            List.push(
                Mock.mock({
                    apple:Mock.Random.float(100,8000,0,0),
                    vivo:Mock.Random.float(100,8000,0,0),
                    oppo:Mock.Random.float(100,8000,0,0),
                    小米:Mock.Random.float(100,8000,0,0),
                    三星:Mock.Random.float(100,8000,0,0),
                    苹果:Mock.Random.float(100,8000,0,0),
                })
            )
        }
        return {
            code:20000,
            data:{
               
                tableData:[
					{
                        id:"001",
                        name: "李雷",
                        job: "后端研发",
                        jion: "2000-10-06",
                        address: "上海静安",
															
					},
					{
						id:"002",
                        name: "韩梅梅",
                        job: "后端研发",
                        jion: "2000-10-06",
                        address: "上海静安",						
					},
					{
						id:"003",
                        name: "孙小小",
                        job: "后端研发",
                        jion: "2000-10-06",
                        address: "上海静安",									
					},
					{
						id:"004",
                        name: "李静怡",
                        job: "后端研发",
                        jion: "2000-10-06",
                        address: "上海静安",								
					},
					{
						id:"005",
                        name: "张冬梅",
                        job: "后端研发",
                        jion: "2000-10-06",
                        address: "上海静安",							
					},
				],
            }
        }
    }
    
}