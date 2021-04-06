const getOsEnv = (key: string, optional: boolean = true): string => {
  if (!optional && typeof process.env[key] === "undefined") {
    throw new Error(`Environment variable ${key} is not set.`);
  }

  return process.env[key] as string;
};

const toNumber = (value: string): number => {
  return parseInt(value, 10);
};

const toBool = (value: string): boolean => {
  return value === "true";
};

const getPortNumber = (): number => {
  const parsedPort: number = toNumber(getOsEnv("APP_PORT"));
  const defaultPort: number = 3000;

  if (isNaN(parsedPort)) {
    return defaultPort;
  }
  if (parsedPort >= 0) {
    return parsedPort;
  }
  return defaultPort;
};

export { getOsEnv, toNumber, toBool, getPortNumber };
