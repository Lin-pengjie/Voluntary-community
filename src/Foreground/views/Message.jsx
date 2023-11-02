import Style from "../assets/css/Message.module.css"
import MNavigationBar from "../components/MNavigationBar/App"

export default function Message() {
  return (
    <div className={Style.box}>
      <MNavigationBar />
      <div style={{flex:"3",background:'#91caff'}}></div>
      <div style={{flex:"9"}}></div>
    </div>
  )
}