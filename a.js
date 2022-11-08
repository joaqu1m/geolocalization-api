export async function analyticsLogEvents(event, params) {
    const firebase = await import('firebase/app')
    await import('firebase/analytics')
    firebase.default.analytics().logEvent(event, params)
}