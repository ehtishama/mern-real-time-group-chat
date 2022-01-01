import MessagePanel from "../components/message-panel";
import Sidebar from "../components/sidebar";

export default function Home(props) {
    return (
        <div class="flex">
            <Sidebar />
            <MessagePanel />
        </div>
    );
}
