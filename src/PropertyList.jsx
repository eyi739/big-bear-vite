import Property from "./Property"
import "./PropertyList.css"
export default function PropertyList({properties}){
    return (
        <div className="PropertyList">
            {properties.map((p) => {
                return <Property 
                    key={p.id}
                    // name={p.name}
                    // rating={p.rating}
                    // price={p.price}
                    {...p}
                />
            })}
        </div>
          
    )
}