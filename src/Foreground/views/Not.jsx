import img from "../assets/img/404.png"

export default function Not() {
    return (
        <div style={{ width: "100%", height: "600px" }}>
            <div style={{ width: "60%", margin: "auto" }}>
                <img src={img} style={{ width: "100%", height: "600px" }}></img>
                <div style={{ fontSize: "23px", textAlign: "center" }}>
                    网址好像不太对哦！
                </div>
            </div>
        </div>
    )
}
