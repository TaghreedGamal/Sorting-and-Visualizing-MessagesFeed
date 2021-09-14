import { useState , useEffect} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import Label from "../label/label";

function Map (props){
    const {locationsList}=props
    const [newLocationsList,setNewLocationsList]=useState([])
    const [selectedLocation, setSelectedLocation] = useState({})
    const copyLocationsList=[...locationsList]

    // get coordinates of every city from geocoding api
    useEffect(() => {
        const getCoordinates = async () => {
            for (let index = 0; index < copyLocationsList.length; index++) {
                const l = copyLocationsList[index];
                const c =l.city;
                const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${c}.json?access_token=${process.env.MAPBOX_KEY}&limit=1`;
                const res = await axios.get(url);
                const coordinate=res.data.features[0]
                const long=coordinate.center[0]
                const lat=coordinate.center[1]
                l["lataitude"]=lat
                l["longatude"]=long
            }
            setNewLocationsList(copyLocationsList)
        }
        getCoordinates()
    }, []);
    
    // view of mapbox map
    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: 26.697578079712265,
        longitude: 30.00545915385502,
        zoom: 2,
    });

    // get marker icon and label/popup city name according to category
    const getImage = (category) => {
        switch (category) {
            case "Positive":
                return '😃';
            case "Negative":
                return '😓';
            case "Neutrual":
                return '😌';
            default:
                return '😃' ;
        }
    };
    const getColor = (category) => {
        switch (category) {
            case "Positive":
                return 'green'
            case "Negative":
                return 'red'
            case "Neutrual":
                return 'indigo'
            default:
                return 'black' ;
        }
    };

    // change size of marker icon according to its position which is related to its time 
    const getSize = (index) =>{
        let size=18 + (index * 4)
        return size
    }

    return (
        <>
            <ReactMapGL
                mapStyle="mapbox://styles/taghreeed/ckth6kc514xr217p7fm4j1iyy"
                mapboxApiAccessToken={process.env.MAPBOX_KEY}
                {...viewport}
                onViewportChange={(nextViewport) => setViewport(nextViewport)}
                >
                {newLocationsList.map((location,index) => (
                    <div key={location.id}>
                    <Marker
                        latitude={location.lataitude}
                        longitude={location.longatude}
                        offsetLeft={-10}
                        offsetTop={-5}>
                        <a onClick={() => {
                            setSelectedLocation(location);
                        }}>
                            <span className="mapPin"role="img" aria-label="push-pin" style={{fontSize:getSize(index)}}>{getImage(location.category)}</span>
                        </a>
                    </Marker>
                    {selectedLocation.id === location.id ? (
                        <Popup
                            onClose={() => setSelectedLocation({})}
                            closeOnClick={true}
                            latitude={location.lataitude}
                            longitude={location.longatude}>
                            <p style={{color:getColor(location.category)}}>{location.city}</p>
                            <p>{location.msg}</p>
                        </Popup>) : (false)}
                    </div>
                ))}
            </ReactMapGL>
            <div className="labelsBox">
                <Label category="Neutrual" img={getImage("Neutrual")} color={getColor("Neutrual")}/>
                <Label category="Positive" img={getImage("Positive")} color={getColor("Positive")}/>
                <Label category="Negative" img={getImage("Negative")} color={getColor("Negative")}/>
            </div> 
        </>
    )
}
Map.propTypes = {
    locationsList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            msg: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired,
            city: PropTypes.string.isRequired,
            msg: PropTypes.string.isRequired,
        })
    ).isRequired
};
export default Map