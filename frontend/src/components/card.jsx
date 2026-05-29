function Card(props){
    return(
        <div className="card">
            <h2>{props.title}</h2>
            <h1>{props.value}</h1>
        </div>
    );
}
export default Card;