const CurUser={
    uid:1,
    username:"Vincent",
    profilelogo:"logo.jpeg"
}
const Tasks=[
    {id:1,title:"Task1", state:"todo",tag:"Lab",date:"2024-3-1"},
    {id:2,title:"Task2", state:"todo",tag:"Lab",date:"2024-3-2"},
    {id:3,title:"Task3", state:"todo",tag:"HW",date:"2024-3-1"},
    {id:1,title:"Task5", state:"inprogress",tag:"Lab",date:"2024-3-2"},
    {id:2,title:"Task6", state:"inprogress",tag:"HW",date:"2024-3-14"},
    {id:1,title:"Task7", state:"review",tag:"Lab",date:"2024-3-7"},
    {id:2,title:"Task8", state:"review",tag:"HW",date:"2024-3-8"},
    {id:1,title:"Task9", state:"down",tag:"Lab",date:"2024-3-11"},
    {id:2,title:"Task10", state:"down",tag:"HW",date:"2024-3-1"}
]
const WeekTasks=[
    {id:1,urgent:1,important:1,title:"Lab1",tag:"Lab"},
    {id:2,urgent:1,important:1,title:"做家务",tag:"家庭"},
    {id:1,urgent:1,important:0,title:"拍形策视频",tag:"小组作业"},
    {id:1,urgent:0,important:1,title:"宣讲会",tag:"讲座"},
    {id:1,urgent:0,important:0,title:"体侧",tag:"体育"}
]
const Projects=[
    {id:1,title:"Pre Project",total:20,down:0,date:"2024-3-1",grouptag:"notgroup",state:"todo",
        Tasks:[
            {id:1,title:"Task1", state:"todo",tag:"Lab",date:"2024-3-1"},
            {id:2,title:"Task2", state:"todo",tag:"Lab",date:"2024-3-2"},
            {id:3,title:"Task3", state:"inprogress",tag:"Lab",date:"2024-3-2"},
            {id:4,title:"Task2", state:"review",tag:"HW",date:"2024-3-2"}
        ]
    },
    {id:2,title:"ADSLab0",total:11,down:7,date:"2024-3-2",grouptag:"isgroup",state:"inprogress",groupid:5,
    Tasks:[
        {id:1,title:"Task1", state:"todo",tag:"Lab",date:"2024-3-1"},
        {id:2,title:"Task2", state:"todo",tag:"Lab",date:"2024-3-2"},
        {id:3,title:"Task3", state:"inprogress",tag:"Lab",date:"2024-3-2"},
        {id:4,title:"Task2", state:"review",tag:"HW",date:"2024-3-2"}
    ]
    },
    {id:3,title:"Design UI",total:5,down:5,date:"2024-3-3",grouptag:"isgroup",state:"inprogress",groupid:7,
    Tasks:[
        {id:1,title:"Task1", state:"todo",tag:"Lab",date:"2024-3-1"},
        {id:2,title:"Task2", state:"todo",tag:"Lab",date:"2024-3-2"},
        {id:3,title:"Task3", state:"inprogress",tag:"Lab",date:"2024-3-2"},
        {id:4,title:"Task2", state:"review",tag:"HW",date:"2024-3-2"}
    ]
    },
    {id:4,title:"Tech pro",total:16,down:16,date:"2024-3-4",grouptag:"notgroup",state:"review"}
]
const Tag=[
    {name:"Lab"},
    {name:"HW"}
]
const DayTasks=[
    {key:1,title:"Lab1",tag:"Lab",completed: false},
    {key:2,title:"做家务",tag:"家庭",completed: false},
    {key:3,title:"拍形策视频",tag:"小组作业",completed: true},
    {key:4,title:"宣讲会",tag:"讲座",completed: true},
    {key:5,title:"体侧",tag:"体育",completed: true}
]
export {CurUser,Tasks,Tag,Projects,WeekTasks,DayTasks};