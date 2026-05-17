/** 2^-32 - the smallest possible 32-bit decimal number */
export const FRAC = 2 ** -32;

/** 2^32 as a constant for scaling or large integer operations. */
export const U32_2_POW_32 = 0x100000000;

/** Default Mash algorithm seed number */
export const MASH_SEED = 0xefc8249d;

/** 2^32 * 2^32 / 0x100000000 - Mash normalization factor */
export const MASH_MULT = 0.02519603282416938;

/** 64-bit mask value */
export const INT_64 = 0xffffffffffffffffn;

/** 53-bit scaling value */
export const INT_53_SCALE = 9007199254740992;
