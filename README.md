## jsonp

## date

## ajax

## promise

## async await

## bootstrap 分页表格
bootstrap-table.js

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<link rel="stylesheet" href="./css/bootstrap.min.css" />  
<link rel="stylesheet" href="./css/bootstrap-table.min.css" />      
  
<script src="./js/jquery-1.11.0.min.js"></script>  
<script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
<!-- Latest compiled and minified JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.12.1/bootstrap-table.min.js"></script>

<!-- Latest compiled and minified Locales -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.12.1/locale/bootstrap-table-zh-CN.min.js"></script>


<body >  
<div id="reportTableDiv" >  
    <table id="reportTable"></table>  
</div>  
<script type="text/javascript">  
//手动制造30条数据  


  var addrJson = [{"id":1,"addr":"安徽","detail":"安徽省合肥市蜀山区怀宁路288号置地广场C座  2405 2406室","phone":"0551-65268410"},{"id":2,"addr":"北京","detail":"北京市海淀区西翠路17号院24号楼3层303","phone":"010-59904207"},{"id":3,"addr":"大连","detail":"大连市甘井子区泉水A4区45号","phone":"0411-82550742"},{"id":4,"addr":"福建","detail":"福州市鼓楼区五四路173号新华福广场B座12层A1","phone":"0591-87836879"},{"id":5,"addr":"甘肃","detail":"秦安路105号亚盛大厦东楼十五层","phone":"0931-2161609"},{"id":6,"addr":"广东","detail":"广州市天河区珠江东路30号广州银行大厦801.802","phone":"020-83936833"},{"id":7,"addr":"广西","detail":"南宁市青秀区东葛路118号南宁青秀万达广场东3栋4002号","phone":"0771-5778191"},{"id":8,"addr":"贵州","detail":"贵州省贵阳市观山湖区中天金融商务区东四塔上海浦东发展银行13B座","phone":"0851-85822587"},{"id":9,"addr":"海南","detail":"海南省海口市国贸路45号银通国际中心16层A","phone":"0898-66539668"},{"id":10,"addr":"河北","detail":"河北省石家庄市新华区新华西路296号盛安大厦5层","phone":"0311-89695804"},{"id":11,"addr":"河南","detail":"河南省郑州市郑东新区东风南路绿地中心双子塔南塔20层天安财险2009室","phone":"0371-65793377"},{"id":12,"addr":"黑龙江","detail":"哈尔滨市南岗区赣水路191号一层","phone":"0451-53928028"},{"id":13,"addr":"湖北","detail":"武汉市武昌区东湖路155号","phone":"027-88609928"},{"id":14,"addr":"湖南","detail":"长沙市雨花区芙蓉中路三段489号新芙蓉之都商务大楼9层","phone":"0731-85834516"},{"id":15,"addr":"吉林","detail":"吉林省长春市南关区人民大街8688号明珠广场A座五楼","phone":"0431-85071286"},{"id":16,"addr":"江苏","detail":"江苏省南京市秦淮区石鼓路107号华威大厦第六层","phone":"025-66007152"},{"id":17,"addr":"江西","detail":"江西省南昌市红谷滩新区红谷中大道1368号鼎峰中央BC座21楼","phone":"0791-86208166"},{"id":18,"addr":"辽宁","detail":"沈阳市沈河区友好街10号新地中心10层04单元","phone":"024-22559302"},{"id":19,"addr":"内蒙古","detail":"内蒙古自治区呼和浩特市新城区迎宾路大唐金座1106号","phone":"待定"},{"id":20,"addr":"宁波","detail":"宁波市江东区会展路128号国际会展中心10号馆9楼9D08室","phone":"0574-87135638"},{"id":21,"addr":"青岛","detail":"青岛市宁夏路288号软件园7号楼3层A区","phone":"0532-68872356"},{"id":22,"addr":"厦门","detail":"中国自由贸易试验区厦门片区屿南三路18号四层L区","phone":"0592-8122099"},{"id":23,"addr":"山东","detail":"济南市高新区经十路8000号龙奥金座1号楼15层北半层","phone":"0531-83197819"},{"id":24,"addr":"山西","detail":"太原市杏花岭区新建路252号皇冠大厦9层","phone":"0351-7771575"},{"id":25,"addr":"陕西","detail":"陕西省西安市雁塔区科创路168号西电科技园C座5层","phone":"029-81889764"},{"id":26,"addr":"上海","detail":"中国上海自由贸易试验区浦东大道2000号18楼GH室","phone":"021-68552702"},{"id":27,"addr":"深圳","detail":"深圳市福田区南园街道深南中路1019号万德大厦9楼901室","phone":"0755-82159118"},{"id":28,"addr":"四川","detail":"成都市人民中路二段22号四川农资大厦第22层","phone":"028-85034707"},{"id":29,"addr":"天津","detail":"天津市河西区台儿庄路海河西岸公馆1号楼5楼","phone":"022-83656000"},{"id":30,"addr":"新疆","detail":"新疆乌鲁木齐市水磨沟区安居南路70号中国万向招商大厦综合办公楼1栋16层","phone":"0991-4879190"},{"id":31,"addr":"云南","detail":"昆明市西山区东寺街阿诗玛翡翠城1幢301室","phone":"0871-63116005"},{"id":32,"addr":"浙江","detail":"浙江省杭州市上城区望江东路332号望江国际1号楼5楼","phone":"0571-58112314"},{"id":33,"addr":"重庆","detail":"重庆市渝中路瑞天路56-3号20层4、5单元","phone":"023-88755324"}]
$(function () {  

    $('#reportTable').bootstrapTable({  

         //请求方法
         method: 'get',
                 //是否显示行间隔色
                striped: true,
                //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）     
                cache: false,    
                //是否显示分页（*）  
                pagination: true,   
                 //是否启用排序  
                sortable: false,    
                 //排序方式 
                sortOrder: "asc",    
                //初始化加载第一页，默认第一页
                //我设置了这一项，但是貌似没起作用，而且我这默认是0,- -
                //pageNumber:1,   
                //每页的记录行数（*）   
                pageSize: 15,  
                //可供选择的每页的行数（*）    
                pageList: [10, 25, 50, 100],
                //这个接口需要处理bootstrap table传递的固定参数,并返回特定格式的json数据  

                showHeader:false,
                smartDisplay:false,
                //是否显示搜索
                search: false,  
                //Enable the strict search.    


        data:addrJson,  
        sidePagination:"client",  
        showColumns:"true",  
        columns:   [  
                {field:"id",title:"序号",align:"center",valign:"middle",sortable:"true"},  
                {field:"addr",title:"分公司",align:"center",valign:"middle",sortable:"true"},  
                {field:"detail",title:"职场地址",align:"center",valign:"middle",sortable:"true"},  
                {field:"phone",title:"固定电话",align:"center",valign:"middle",sortable:"true"},  
            ],  
    }); 
                   
    });   
</script>  
<div>  
  
</body>  
</html>

```
