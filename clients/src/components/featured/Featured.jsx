import useFetch from "../../hooks/useFetch";
import "./featured.css";


const Featured = () => {
  const {data, loading, error} = useFetch("hotels/countByCity?cities=Kathmandu,Pokhara,Janakpur")
 
  return (
    <div className="featured">
      {loading ? "Loading! Please wait" : (<><div className="featuredItem">
        <img
          src="https://www.worldtravelguide.net/wp-content/uploads/2018/04/shu-Asia-Nepal-Kathmandu-Boudhanath-stupa-266168759-danm12-1440x823.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Kathmandu</h1>
          <h2>{data[0]} Hotels</h2>
        </div>
      </div>
      
      <div className="featuredItem">
        <img
          src="https://stingynomads.com/wp-content/uploads/2019/04/Phewa-lake-Pokhara.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Pokhara</h1>
          <h2>{data[1]} Hotels</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://4.bp.blogspot.com/-1qTuK9H9eZM/WkZVZJnRmzI/AAAAAAAAAJs/iTiSOsUsglcFxZS2LOQwlQYVDLRfK4czwCLcBGAs/s1600/janaki%2Btemple.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Janakpur</h1>
          <h2>{data[2]} Hotels</h2>
        </div>
      </div></>)}
    </div>
  );
};

export default Featured;
