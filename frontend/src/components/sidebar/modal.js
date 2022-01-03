export default function Modal({open, setOpen}) {
    if (!open) return null;
    return (
        <div>
            <div
                className="shadow-md absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center"
                onClick={() => setOpen(false)}>
                <div className="bg-dark-100 p-8 rounded-3xl w-[650px]" onClick={(e) => {
                    e.stopPropagation()
                }}>
                    <h2 className="font-medium">New channel</h2>
                    <div>
                        <form action="">
                            <div>
                                <input type="text" placeholder="Channel name"/>
                            </div>
                            <div>
                                <textarea
                                    rows="3"
                                    placeholder="Channel description"
                                    className="w-full bg-dark-input rounded-md mb-4 p-3"
                                />
                            </div>
                            <button className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
