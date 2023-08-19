function getdetails(){
    let xhttp= new XMLHttpRequest()
    let city=document.getElementById("city").value
    let dataList=[]
    let date=[];

    let key="8a224cfee15625ca16899af66a864ca8"
    let url=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=metric`

    xhttp.open("get",url,false)
    xhttp.onreadystatechange = function() {
        if(this.status == 200 && this.readyState == 4){

            document.getElementById('table').innerHTML = `<canvas id="myChart"></canvas>`
            const ctx = document.getElementById('myChart');

            let data=JSON.parse(xhttp.responseText)
            
            let {list,city:{country}}=data
            
            for(let i=0;i<list.length;i+=8){
                let {dt_txt,main:{temp}} = list[i];
                dataList.push(temp)
                date.push((dt_txt.split(" "))[0])
            }
            
            let {main:{temp_min,temp_max}}=list[0]
            document.getElementById('place').innerHTML =`${city} ${country}`
            document.getElementById('min').innerHTML =`min-temp: ${temp_min}`
            document.getElementById('max').innerHTML =`max-temp: ${temp_max}`

            console.log(date)
            console.log(dataList)
            
            new Chart(ctx, {
                type: 'bar',
                data: {
                  labels: date,
                  datasets: [{
                    label: "temperature",
                    data: dataList,
                    borderWidth: 1
                  }]
                },
                options: {
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }

                }
              });

        }
        if(this.status==404)
        {
            document.getElementById('place').innerHTML = "placeNotFound"
            document.getElementById('min').innerHTML = ""
            document.getElementById('max').innerHTML = ""
            document.getElementById('table').innerHTML = ""
        }
    }
    xhttp.send()
    
}