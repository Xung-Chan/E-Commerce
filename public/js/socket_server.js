const io_client = io("http://localhost:8000", {
    transports: ["websocket"],
});
function joinProductRoom(productId, onNewComment, onNewRating) {
    io_client.emit("joinProduct", productId);

    io_client.on("newComment", (comment) => {
        console.log("New comment received:", comment);
        onNewComment(comment);
    });

    io_client.on("newRating", (rating) => {
        console.log("New rating received:", rating);
        onNewRating(rating);
    });

}