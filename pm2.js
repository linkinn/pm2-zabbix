const pm2 = require("pm2")

const args = process.argv.slice(2)

function intStatus(status) {
  if (status === "online") return 1
  else if (status === "stopped") return 0
  else if (status === "errored") return 2
  else return 3
}

pm2.connect(function (err) {
  if (err) {
    console.log(3)
    process.exit(2)
  }

  pm2.list((err, list) => {
    if (err) {
      console.log(3)
      process.exit(2)
    }

    if (list.length === 0) {
      console.log(3)
      process.exit(2)
    }

    if (args.length > 0) {
      const pm2ServiceStatus = list.filter((l) => {
        return l.name === args[0]
      })

      try {
        const status = intStatus(pm2ServiceStatus[0].pm2_env.status)
        console.log(status)
        process.exit(2)
        return
      } catch {
        console.log(3)
        return
      }
    }

    const pm2List = {
      data: list.map((l) => {
        return { "{#NAME}": l.name, "{#STATUS}": intStatus(l.pm2_env.status) }
      })
    }

    const pm2ListString = JSON.stringify(pm2List)
    console.log(pm2ListString)
    process.exit(2)
  })
})
