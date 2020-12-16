const pm2 = require('pm2');

const args = process.argv.slice(2)

pm2.connect(function (err) {
  if(err) {
          console.log("Error", err.message)
          process.exit(2)
  }
  pm2.list((err, list) => {
    if(err) {
      console.log(err)
      process.exit(2)
    }
    if (list.length === 0) {
      process.exit(2)
    }

    if (args.length > 0) {
      const pm2ServiceStatus = list.filter(l => {
        return l.name === args[0]
      })
      console.log(pm2ServiceStatus[0].pm2_env.status)
      process.exit(2)
      return
    }

    const pm2List = {data: list.map(l => {
      return {"{#NAME}": l.name, "{#STATUS}": l.pm2_env.status}
    })}

    const pm2ListString = JSON.stringify(pm2List)
    console.log(pm2ListString)
    process.exit(2)
  })
})
