export const MobileHelper = {
    operatorFinder (mobile = '') {
        const operator = {
            9: 'MCI',
            1: 'MCI',
            3: 'IRANCELL',
            0: 'IRANCELL',
            2: 'RIGHTEL'
        }
        const _mobile = parseInt(mobile).toString() //for delete 0 from first of mobile
        const target = parseInt(_mobile[1])
        return operator[target] || operator[9]
    }
}