import useFetch from "../../hooks/useFetch";
import "./propertyList.css";

const PropertyList = () => {
  const { data, loading, error } = useFetch("/hotels/countByType");

  const images = [
    "https://fh-sites.imgix.net/sites/3119/2019/11/25174308/hyatt-regency-kathmandu1-e1574683099131.jpg?auto=compress%2Cformat&w=1024&h=1024&fit=max",
    "https://a.otcdn.com/imglib/hotelfotos/7/255/utse-hotel-katmandu-001.jpg",
    "https://media-cdn.tripadvisor.com/media/photo-s/21/97/e2/ae/hotel-exterior.jpg",
    "https://cdn.audleytravel.com/1050/749/79/1337790-kathmandu-guest-house.webp",
    "https://media.istockphoto.com/id/94472320/photo/budget-hotel-room.jpg?s=612x612&w=0&k=20&c=MJmnXOOovadzO-a4TiAmelIEuzM1WS43dl8-Sg_1dz0=",
  ];
  return (
    <div className="pList">
      {loading ? (
        "loading"
      ) : (
        <>
          {data &&
            images.map((img,i) => (
              <div className="pListItem" key={i}>
                <img
                  src={img}
                  alt=""
                  className="pListImg"
                />
                <div className="pListTitles">
                  <h1>{data[i]?.type}</h1>
                  <h2>{data[i]?.count}</h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;