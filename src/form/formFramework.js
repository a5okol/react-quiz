export function creacteControl(config, validation) {
    return {
        ...config,
        validation,
        valid: !validation,
        touched: false,
        value: ''
    }

}