export const BASE_URL = '/api'
const bearer = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiS1VST0tJS0FaRSIsImlhdCI6MTY4NDAwOTA5OCwic3ViIjoiYWdlbnQtdG9rZW4ifQ.FgUOeuOOIpEpA0zwW7yxacKiTJzYuE7HL7LE7eXpeKGmdYFaqk-dyX1OYn6_s4R9vcI2D2IqSEDRv_DecgU3MlPvIrGPVDVRGrmVi6h_AIUKGzSk_FBrABYD50xqOyVhA3tV4djgHPMhlpDvNGuQ4FSYSrYOuiaGDwngWuzeUHksm-vD9ZcVYgvsyRjoxygc4We_lGurOF4c6T5n6-e3gN5EH9TFueco0Si06YrS4x0F1dVjIjTwFyEENc88TNY2c2_DGkmQ_BjhcaUNCmXL2x1DoT6m0_i2eW_omufYoB9dT1WbmJh9ZJ2y-6s6ZyA_-GICbd5a1rNlq-P8KyVHUA'
type CallParams = {
    headers?: Record<string, any>
}
export async function api (url: string, params: CallParams = {}) {
    params = Object.assign({
        mode: 'cors',
        cache: 'no-cache',
    }, params)

    params.headers = Object.assign({
        Authorization: `Bearer ${bearer}`,
        'Content-Type': 'application/json'
    }, params.headers)

    let response = await fetch(BASE_URL + url, params)
    let json = await response.json() || {}
    if (!response.ok){
        let errorMessage = json.error || response.status
        throw new Error(errorMessage)
    }
    return json
}
