import "dotenv/config";
export interface VendingMachineServerConfig {
  port: number;
}
export function loadConfig(): VendingMachineServerConfig {
  const config: Record<string, any> = {};
  for (const [name, value] of Object.entries(process.env)) {
    if (!name.startsWith("VENDING_MACHINE_")) {
      continue;
    }

    // getting config key by taking the string from the index where the app prefix ends
    let configKey = name.substring("VENDING_MACHINE_".length);
    config[configKey.toLowerCase()] = value;
  }
  return config as VendingMachineServerConfig;
}
