import Map from '../components/map/Map'
import {dataList} from "../config/jsonformatter";
import 'mapbox-gl/dist/mapbox-gl.css';

export default function Home() {
  const list=[];
  const getCity= (city) =>{
    const reg= /, ?([A-Z][a-z]*(\s[A-Za-z][A-Za-z]*)*)\w+/;
    const c= city.match(reg)
    const ci=c[0].replace(',','')
    return ci.trim();
  }
  dataList.Entries.Entry.forEach((obj,index) =>{
    const cit = getCity(obj.message);
    list.push({id:index,category:obj.sentiment,msg:obj.message,city:cit})
  })
  return (
    <div className="mapdev">
      <Map locationsList={list}/>
    </div>
  )
}
