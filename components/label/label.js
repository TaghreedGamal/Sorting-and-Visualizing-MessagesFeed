import PropTypes from "prop-types";
function Label (props){
    const{img,category,color}=props
    return(
        <div className="label" style={{backgroundColor:color}} >
            <span role="img">{img}</span>
            <p>{category}</p>
        </div>
    )
}
Label.propTypes = {
    img: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
};
export default Label;