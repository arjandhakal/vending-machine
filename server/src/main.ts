console.log(`Hello World`);

async function main() {
  process.on("unhandledRejection", (err: any) => {});
}
