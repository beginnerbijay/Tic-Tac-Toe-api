const app = require('express')()
const httpServer = require('http').createServer(app)
const io = require('socket.io')(httpServer, {
    cors: {
      origin: "*"
    }
  })
const port = process.env.PORT || 5000

io.on('connection',(socket)=>{
    console.log("user is connected")

    socket.on('joinroom',({roomid,name})=>{
        console.log(`${name} is in ${roomid}`)
        socket.join(roomid)
    })

    socket.on('play',({id,roomid})=>{
      console.log(`play at ${id} to ${roomid}`);
      socket.broadcast.to(roomid).emit("updateGame", id);
    })

    socket.on('disconnect',()=>{
        console.log('user is disconnected')
    })
})

httpServer.listen(port,()=>{console.log(`server started at ${port}`)})