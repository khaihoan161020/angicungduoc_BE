interface JWTDecodeInterface {
    userID: string
    email: string
}

interface TokenPair {
    accessToken: string
    refreshToken: string
}

export { JWTDecodeInterface, TokenPair }
