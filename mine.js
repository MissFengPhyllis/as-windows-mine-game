var Mine;//全局，记录每个小方块应对应的值的数组
var leiNum;//记录雷的数量（全局的）
var inGame = 0;//判断游戏是否开始的标志，0为未开始，1为进行中，2为结束时
//oncontextmenu= 当单击右键打开菜单时触发事件
 document.oncontextmenu=function(){ 
 //设置事件的返回值为false,即取消事件处理，取消右键点击事件    
  event.returnValue=false;    
  } 


  //选择难度
$(document).ready(function($){
	$("#level").change(function(){
		var level = $('#level option:selected').val();
		if(level == 1){
			intFace(8,8,1);//雷的格子数   雷数   难度级别
		}else if(level == 2){
			intFace(10,12,2);
		}else if(level == 3){
      console.log(level);
			intFace(14,20,3);
		}else{
      intFace(8,8,1);//雷的格子数   雷数   难度级别
    }
		// console.log(level);
	});
});

//初始化雷局
function intFace(size,number,level){
  
  if(level == 1){
     $("#gameLevel").html("初级");
  }else if(level == 2){
      $("#gameLevel").html("中级");
  }else if(level == 3){
     $("#gameLevel").html("高级"); 
  }else{
    return ;
  }
 save_time();
	leiNum = number;//雷数等于传递进来的参数
	var mineTable = $("#mainInt");
		// console.log($("#leiNum").html());
	$("#leiNum").html(number);
	// console.log($("#leiNum").html());
	mineTable.innerHTML = "";
	var mine = new Array(size);
	//创建二维数组
	for( var i = 0; i<size; i++){
		mine[i] = new Array(size);
	}
	mine = randomNumber(mine,number);  
	Mine = mine;
	$("#mainInt").empty();
	mineTable.append(createRow(size,mine));

}
//随机布雷
function randomNumber(mine,num){
	var mine = mine;
	var rows = mine.length;
	var cols = mine.length;
	var i = 0;
	while(i < num){//随机布雷
		var row = Math.ceil((rows*Math.random()))-1;
		var col = Math.ceil((cols*Math.random()))-1;
		if(mine[row][col]!="雷"){
			mine[row][col] = "雷";
			i ++;
		}
	}//布雷成功

	/**
	int a[2][3]; 说明了一个三行四列的数组，数组名为a，其下标变量的类型为整型。该数组的下标变量共有2×3个，即：
	a[0][0],a[0][1],a[0][2]
	a[1][0],a[1][1],a[1][2]
	*/
	//循环遍历地雷数组中，确定某个按钮周围的雷数
	for(var i = 0; i < rows; i++){
		for(var j = 0; j<cols; j++){
			var mineNum = 0; //周围的雷数
			//判断左上角是否有雷（以当前的坐标为准）
			if((i-1>=0)&&(j-1>=0)){//判断坐标是否在表格中(有出现边缘的情况)
				if(mine[i-1][j-1] == "雷"){
					mineNum++;
				}
			}
			//判断正上方
			if(i >= 1){//判断坐标是否在表格中间
				if(mine[i-1][j] == "雷"){
					mineNum++;
				}
			}
			//判断右上方
			if((i-1>=0)&&(j<=cols-2)){  
                if(mine[i-1][j+1]=="雷"){
                	 mineNum++;  
                }  
            }  
            //判断左边  
            if(j>=1){  
                if(mine[i][j-1]=="雷"){
                	 mineNum++;  
                }  
            }  
            //判断右边   
            if(j<=cols-2){  
                if(mine[i][j+1]=="雷"){
                	 mineNum++;  
                }  
            }  
            //判断左下  
            if((i<=rows-2)&&(j-1>=0)){  
                if(mine[i+1][j-1]=="雷"){
                	 mineNum++;  
                }  
            }  
            //判断正下  
            if(i<=rows-2){  
                if(mine[i+1][j]=="雷"){
                	 mineNum++;  
                }  
            }  
            //判断右下  
            if((i<=rows-2)&&(j<=cols-2)){  
                if(mine[i+1][j+1]=="雷"){
                	 mineNum++;  
                }  
            } 

            if(mine[i][j]!="雷"){  
            	mine[i][j]=mineNum;  
            }  
		}
	}
	return mine;  
}

//创建行
function createRow(row,mine){
  var mine = mine;
  for(var i = 0; i < row; i++){
    $("#mainInt").append("<tr id='tr_"+i+"'class='hang'></tr>");
    for(var j = 0;j < row; j++){
      $("#tr_"+i).append("<td><input type='button' class='myButton' value='"+mine[i][j]+"' onclick='checkLei(this)' id='button_"+i+j+"'></td>");  
    } 
  }
}


  //点击雷的格子，开始扫雷
function checkLei(object){
  inGame = 1;
  getValue(object);   
    timer();
  // console.log(object.className);
  if(object.value == "雷"){  
    object.className="myButton_";
     getValue("over");   
      // console.log($("#time").html());
       var end_time = $("#time").html();
       $("#end_time").html((end_time));
    alert("不好意思，你踩到雷了，游戏结束");  

    if(confirm("重新开始？")){  
      window.location.reload();  
    }  
    return false;
  }else if(object.value == "0"){
     judge();
    showSpace(object);
  }else{
     judge();
    object.className = "myButton8";
  }
   rightClick(object);
   judge();

}

// 标记找到的雷，防止错点
document.onmousedown = rightClick;
function rightClick(obj){
  var $_leiNum = parseInt($("#leiNum").html());
  console.log($_leiNum);
  var e = window.event|| e;
  var value = e.button;
  if(value==2||value==3){ 
    if( obj.target.className == "flagbox"){
      obj.target.className = "myButton";
       $_leiNum++;
      $("#leiNum").html($_leiNum);
    }else{
      obj.target.className = "flagbox";
      $_leiNum--;
      $("#leiNum").html($_leiNum);
    }      
  }
  if(value==0) {
    if( obj.target.className == "flagbox"){
     alert("你已在此处做标记了，再次单击右键，取消标记");
    event.returnValue=false;     
    }else{
      checkLei(obj.target);
    }
  }

}

//当点击的不是空白区或者是触动雷的时候调用下面的函数  
function getValue(object){  
    if("over"!=object){  
    var id=object.id;  
    var button=document.getElementById(id);  
     var str_row = id.charAt(id.length-2);
      var str_col = id.charAt(id.length-1);
      var row=parseInt(str_row);  
      var col=parseInt(str_col);  
    button.value=Mine[row][col];  
    button.className="myButton"+button.value;  
   }else{  
      for(var i=0;i<Mine.length;i++){
        for(var j=0;j<Mine[i].length;j++){  
          var button = $("#button_"+i+j)[0];  
          if(Mine[i][j]=="雷"){  
            button.value=Mine[i][j];  
            button.className="myButton_";  
          }  
        }  
     }  
   }  
}  

//展示空白的周围没有雷的格子，没有雷的话就直接展示出来（递归调用）
function showSpace(object){  
		// alert(object.id);
	    var id=object.id;  
	    // console.log(id);
	    var str_row = id.charAt(id.length-2);
	    var str_col = id.charAt(id.length-1);
	    var row=parseInt(str_row);  
	    var col=parseInt(str_col);  
	    var cols=Mine.length;  
	    var rows=Mine.length;  
	    //判断左上  
        if((row-1>=0)&&(col-1>=0)){  
            var but=$("#button_"+(row-1)+(col-1))[0];  
          	if(but.value!="0"){  
                but.value=(Mine[row-1][col-1]=="雷") ? "" : Mine[row-1][col-1];  
                but.className="myButton"+but.value;  
                }
                if(but.value=="0"){ 
                	 but.className="myButton"+but.value; 
                    showSpace(but);  
                  }       
                 
        }  
        //判断正上  
        if(row>=1){  
            var but=$("#button_"+(row-1)+(col))[0]; 
          		if(but.value!="0"){  
                but.value=(Mine[row-1][col]=="雷") ? "" : Mine[row-1][col];  
                but.className="myButton"+but.value;  
                } 
                  if(but.value=="0"){ 
                	 but.className="myButton"+but.value; 
                    showSpace(but);  
                  }       
                  
                 
            
        }  
        //判断右上  
        if((row-1>=0)&&(col<=cols-2)){  
            var but=$("#button_"+(row-1)+(col+1))[0];
          		 if(but.value!="0"){  
                but.value=(Mine[row-1][col+1]=="雷") ? "" : Mine[row-1][col+1];  
                but.className="myButton"+but.value;  
                }  
                  if(but.value=="0"){ 
                	 but.className="myButton"+but.value; 
                    showSpace(but);  
                  }       
                 
              
        }  
        //判断左边  
        if(col>=1){  
            var but=$("#button_"+row+(col-1))[0]; 
           if(but.value!="0"){  
                but.value=(Mine[row][col-1]=="雷") ? "" : Mine[row][col-1];  
                but.className="myButton"+but.value;  
                }
                  if(but.value=="0"){ 
                	 but.className="myButton"+but.value; 
                    showSpace(but);  
                  }       
                 
        }  
        //判断右边   
        if(col<=cols-2){  
            var but=$("#button_"+row+(col+1))[0];  
             if(but.value!="0"){  
                but.value=(Mine[row][col+1]=="雷") ? "" : Mine[row][col+1];  
                but.className="myButton"+but.value;   
                }
                  if(but.value=="0"){ 
                	 but.className="myButton"+but.value; 
                    showSpace(but);  
                  }       
                 
        }  
        //判断左下  
        if((row<=rows-2)&&(col-1>=0)){  
            var but=$("#button_"+(row+1)+(col-1))[0];  
               	if(but.value!="0"){  
                but.value=(Mine[row+1][col-1]=="雷") ? "" : Mine[row+1][col-1];  
                but.className="myButton"+but.value;  
                }  
                 if(but.value=="0"){ 
                	 but.className="myButton"+but.value; 
                    showSpace(but);  
                  }       
                 
        }  
        //判断正下  
        if(row<=rows-2){  
            var but=$("#button_"+(row+1)+(col))[0];
               	 if(but.value!="0"){  
                but.value=(Mine[row+1][col]=="雷") ? "" : Mine[row+1][col];  
                but.className="myButton"+but.value;    
                }  
                  if(but.value=="0"){ 
                	 but.className="myButton"+but.value; 
                    showSpace(but);  
                  }       
                 
              
        }  
        //判断右下  
        if((row<=rows-2)&&(col<=cols-2)){  
            var but=$("#button_"+(row+1)+(col+1))[0];  
                if(but.value!="0"){  
                but.value=(Mine[row+1][col+1]=="雷") ? "" : Mine[row+1][col+1];  
                but.className="myButton"+but.value;   
                }  
                  if(but.value=="0"){ 
                	 but.className="myButton"+but.value; 
                    showSpace(but);  
                  }       
                 
        } 

 }  
   
 
//判断是否格子是否都是正确的找出来了   
  
 function judge(){ 
  var user = document.getElementById('name').value;
  if(!user) {
    alert("请输入你的ID！");
    window.location.reload();  
    return false;
  }else if (user.length != 6) {
     alert("请输入六位数字ID！");
    window.location.reload();  
    return false;
  }else{
   var level = $('#level option:selected').val();
    var cols=Mine.length;  
    var rows=Mine.length;  
    var allTrue=true;  
    for(var i=0;i<cols;i++)  
      for(var j=0;j<rows;j++){  
          var button = $("#button_"+i+j)[0];   
       if(Mine[i][j]=="雷"&&button.className!="flagbox"){  
           allTrue=false;  
          }  
       else if(Mine[i][j]!="雷"&&button.value!=Mine[i][j]){  
        allTrue=false;  
       }  
       }  
       if(allTrue){ 
       inGame = 2; 
       var end_time = $("#time").html();
       $("#end_time").html((end_time));
        if(confirm("全部雷已经挖出，你胜利了!重新开始?")){  
           window.location.reload();  
        }
        var record ={
          score :parseInt(end_time),
          level:level
        };
        var record_str = JSON.stringify(record);//将json对象转换成为json字符串
        localStorage.setItem(user,record_str);
        save_time();  
       }   
     }
  
 } 

 //计时 
function timer(){ 
  if(inGame == 1) { //只在游戏进行中计时 
   setInterval(function(){     
    var startTime = 0;//开始时间   //计时器
      $("#time").text(function(index,startTime){
        return ++startTime;
      })
    },1000);
  } 
}

//保存记录
function save_time(){
  var allScore_1 = [];
  var allScore_2 = [];
  var allScore_3 = [];
  var scores;
  // console.log(window.localStorage);
    var list = $("#list");
        if( localStorage.length > 0 ){
            var result = ''
                result += '<table border="1">'
                result += '<tr><td>ID</td><td>用时（秒）</td><td>游戏难度</td></tr>'
                for( var i = 0; i < localStorage.length;i++ ){
                    var yourname = localStorage.key(i),
                      na = localStorage.getItem(yourname);
                      scores = JSON.parse(na);//存下分数和等级的对象
                      if(scores.level == 1){
                        allScore_1.push(parseInt(scores.score));
                      }else if(scores.level == 2){
                         allScore_2.push(parseInt(scores.score));
                      }else if(scores.level == 3){
                        allScore_3.push(parseInt(scores.score));
                      }else{

                      }
                      result += '<tr><td> '+yourname+'</td><td> '+scores.score+'</td><td> '+scores.level+'</td></tr>'
                }
                result += '</table>';
                var sortScore_1 = allScore_1.sort(sortNumber);
                var sortScore_2 = allScore_2.sort(sortNumber);
                var sortScore_3 = allScore_3.sort(sortNumber);
                // console.log(sortScore_1);
                // console.log(sortScore_2);
                // console.log(sortScore_3);

               if(sortScore_1 && ($("#gameLevel").html() == "初级")){
                $("#gameLevel").html("初级");
                if(sortScore_1.length>0){
                  if(sortScore_1.length == 1){
                     $("#record1").html(sortScore_1[0]+"秒");
                      $("#record2").html("暂无记录");
                    $("#record3").html("暂无记录");
                  }else if(sortScore_1.length == 2){
                    $("#record1").html(sortScore_1[0]+"秒");
                    $("#record2").html(sortScore_1[1]+"秒");
                    $("#record3").html("暂无记录");
                  }else{
                    $("#record1").html(sortScore_1[0]+"秒");
                    $("#record2").html(sortScore_1[1]+"秒");
                    $("#record3").html(sortScore_1[2]+"秒");
                  }
                }else{
                    $("#record1").html("暂无记录");
                    $("#record2").html("暂无记录");
                    $("#record3").html("暂无记录");
                }
              }else if(sortScore_2 &&  ($("#gameLevel").html() == "中级")){
                $("#gameLevel").html("中级");
                if(sortScore_2.length>0){
                  if(sortScore_2.length == 1){
                     $("#record1").html(sortScore_2[0]+"秒");
                      $("#record2").html("暂无记录");
                    $("#record3").html("暂无记录");
                  }else if(sortScore_2.length == 2){
                    $("#record1").html(sortScore_2[0]+"秒");
                    $("#record2").html(sortScore_2[1]+"秒");
                    $("#record3").html("暂无记录");
                  }else{
                    $("#record1").html(sortScore_2[0]+"秒");
                    $("#record2").html(sortScore_2[1]+"秒");
                    $("#record3").html(sortScore_2[2]+"秒");
                  }
                }else{
                    $("#record1").html("暂无记录");
                    $("#record2").html("暂无记录");
                    $("#record3").html("暂无记录");
                }
               }else if(sortScore_3 &&  ($("#gameLevel").html() == "高级")){
                  if(sortScore_3.length>0){
                    $("#gameLevel").html("高级");
                    if(sortScore_3.length == 1){
                      $("#record1").html(sortScore_3[0]+"秒");
                      $("#record2").html("暂无记录");
                      $("#record3").html("暂无记录");
                    }else if(sortScore_3.length == 2){
                      $("#record1").html(sortScore_3[0]+"秒");
                      $("#record2").html(sortScore_3[1]+"秒");
                      $("#record3").html("暂无记录");
                    }else{
                      $("#record1").html(sortScore_3[0]+"秒");
                      $("#record2").html(sortScore_3[1]+"秒");
                      $("#record3").html(sortScore_3[2]+"秒");
                    }
                  }else{
                      $("#record1").html("暂无记录");
                      $("#record2").html("暂无记录");
                      $("#record3").html("暂无记录");
                  } 
                }else{
                  $("#record1").html("暂无记录");
                      $("#record2").html("暂无记录");
                      $("#record3").html("暂无记录"); 
                }    
                list.html(result);
        }else{
          $("#record1").html("暂无记录");
          $("#record2").html("暂无记录");
          $("#record3").html("暂无记录");
            list.html("目前数据为空");
        }
}
// save_time();

function sortNumber(a,b)
  {
  return a - b
  }

function clean(){
   window.localStorage.clear();
    window.location.reload();  
  }
