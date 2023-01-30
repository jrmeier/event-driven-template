export const makeReturnHandler =
  ({ version = '0.0.0', gitBranch, gitSha, deployTime }) =>
  (body) => {
    const [returnBody, shouldStringify] = Array.isArray(body)
      ? [body[0], body[1]]
      : [body, true]

    const __meta = {
      gitBranch,
      gitSha,
      deployTime,
      serverTime: new Date().toISOString(),
      serviceVersion: version
    }

    const result = {
      statusCode: 200,
      body: shouldStringify
        ? JSON.stringify({ ...returnBody, __meta })
        : returnBody
    }

    return result
  }
