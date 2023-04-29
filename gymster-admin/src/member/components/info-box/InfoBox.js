
export default function InfoBox(props) {
    return (
        <>
            <div className="info-box">
                <div className="d-flex justify-content-center align-items-center mb-2">
                    <i style={{color:(props.color)}} className={props.icon} />
                    <h4>{props.name}</h4>
                </div>
                <p>{props.number}</p>
            </div>
        </>
    )
}