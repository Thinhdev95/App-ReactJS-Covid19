import React, {useState, useEffect } from 'react'
import { Pie, defaults } from 'react-chartjs-2'
import {TextField, FormControl, InputLabel, Select, NativeSelect, FormHelperText, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// defaults.global.tooltips.enabled = false
// defaults.global.legend.position = 'bottom'

const BarChart = () => {
  const [area,setArea] = useState('Asia');
  const [ObjectFilter,setObjectFilter] = useState('deaths');
  const UrlApi = 'https://corona.lmao.ninja/v2/countries';
  const handleChangeArea =(e) => {
    console.log(e);
    setArea(e);
    } 
    const handleChangeObjectFilter =(e) => {
    console.log(e);
    setObjectFilter(e);
    }
    
    const [chartData, setChartData] = useState({});
    const chart = () => {
      console.log(area);
      console.log(ObjectFilter);
        let Title_Push = [];
        let Data_Push = [];
        var Res_dataFilter =[];
        fetch(UrlApi)
           .then(res => res.json())
            .then(res => {
              res.forEach(function(item)
              {
                if(item.continent == area){
                  Res_dataFilter.push(item);
                }
              })
              if(ObjectFilter == "deaths"){
                Res_dataFilter.sort(function(a,b){
                  return b.deaths - a.deaths})
              }
              if(ObjectFilter == "cases"){
                console.log("123456")
                Res_dataFilter.sort(function(a,b){
                  return b.cases - a.cases})
              }
              if(ObjectFilter == "recovered"){
                Res_dataFilter.sort(function(a,b){
                  return b.recovered - a.recovered})
              }
              if(ObjectFilter == "tests"){
                Res_dataFilter.sort(function(a,b){
                  return b.tests - a.tests})
              }
              if(ObjectFilter == "oneDeathPerPeople"){
                Res_dataFilter.sort(function(a,b){
                  return b.oneDeathPerPeople - a.oneDeathPerPeople})
              }
                // Res_dataFilter.sort(function(a,b){
                //     return b.deaths - a.deaths;
                // })
                // ;
                var lstObject = [...Res_dataFilter.slice(0,10)]
                lstObject.forEach(function(item){
                    Title_Push.push(item.country);
                    if(ObjectFilter == "deaths"){
                      Data_Push.push(parseInt(item.deaths))
                    }
                    if(ObjectFilter == "cases"){
                      Data_Push.push(parseInt(item.cases))
                    }
                    if(ObjectFilter == "recovered"){
                      Data_Push.push(parseInt(item.recovered))
                    }
                    if(ObjectFilter == "tests"){
                      Data_Push.push(parseInt(item.tests))
                    }
                    if(ObjectFilter == "oneDeathPerPeople"){
                      Data_Push.push(parseInt(item.oneDeathPerPeople))
                    }
                })
            console.log(Title_Push);
            console.log(Data_Push);
            
            setChartData({
              labels: Title_Push,
              datasets: [
                {
                  label: "level of thiccness",
                  data: Data_Push,
                  backgroundColor: ["rgba(75, 192, 192, 0.6)","red","blue",
                  "rgba(75, 22, 192, 0.6)",
                  "rgba(75, 192, 43, 0.6)",
                  "rgba(12, 192, 44, 0.6)",
                  "rgba(75, 33, 192, 0.6)",
                  "rgba(3, 45, 192, 0.6)",
                  "rgba(75, 192, 56, 0.6)",
                  "rgba(75, 12, 192, 0.6)",
                ],
                  borderWidth: 4
                }
              ]
            });
          })
          .catch(err => {
            console.log(err);
          });
      };
      useEffect(() => {
         chart();
      },[area,ObjectFilter]);
  return (
   <div style={{textAlign:"center"}}>
      <h2>Filter Value </h2>
        <form>
            <FormControl >
            <InputLabel htmlFor="age-native-helper">Khu V???c</InputLabel>
            <NativeSelect
            defaultValue={area}
            onChange={(e) => handleChangeArea(e.target.value)
            }
            >
            <option value={"Asia"}>Ch??u ??</option>
            <option value={"Europe"}>Ch??u ??u</option>
            <option value={"Africa"}>Ch??u Phi</option>
            <option value={"North America"}>B???c M???</option>
            <option value={"South America"}>Nam M???</option>
            </NativeSelect>
                <FormHelperText>Khu v???c b???n mu???n hi???n th??? th??ng tin</FormHelperText>
            <NativeSelect
            defaultValue={ObjectFilter}
            onChange={(e) => handleChangeObjectFilter(e.target.value)
            }
            >
            <option value={"cases"}>Ca nhi???m</option>
            <option value={"deaths"}>T??? vong</option>
            <option value={"recovered"}>B??nh ph???c</option>
            <option value={"tests"}>X??t nghi???m</option>
            <option value={"oneDeathPerPeople"}>oneDeathPerPeople</option>
            </NativeSelect>
                <FormHelperText>?????i t?????ng l???c</FormHelperText>
            </FormControl>
            <br/>
            <Button onClick={() => handleChangeArea()} color="primary" variant="contained">Th??m</Button>
        </form>
        <br/>
        <div style={{width: "500px",height:"500px",margin:"0 auto"}}>
        <Pie
        data={chartData}
        height={500}
        width={750}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontSize: 25,
            },
          },
        }}
      />
        </div>
    </div>
  )
}

export default BarChart