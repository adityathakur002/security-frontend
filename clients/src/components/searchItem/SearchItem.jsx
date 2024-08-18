import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      
      {/* <img src={item.photos[0]} alt="" className="siImg" /> */}
      <img src="https://www.theknot.com/tk-media/images/9a506749-95e9-47cf-857e-5374f2205b93~rs_768.h" alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}m from Main Road</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Amazing Service
        </span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && <div className="siRating">
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">Rs.{item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
          <button className="siCheckButton">Show Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
