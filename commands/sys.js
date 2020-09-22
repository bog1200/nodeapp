module.exports = {
	name: 'sys',
	description: 'sys',
	execute(message, args) {
        if (message.author.id==="239136395665342474")
        {
        const used = process.memoryUsage();
        for (let key in used) {
  console.log(`[RAM] ${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
}}
	},
};