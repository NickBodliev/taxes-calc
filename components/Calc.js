// SPA & SRL, SRLs

export const IRES = 24;
export const IRAP = 3.9;
export const IVA = 22;
export const IMPOSTA_SOSTITUTIVA = 15;
export const INPS = 33.72;

export const calcPercentage = (percentage, num) => {
    return num/100*percentage;
}

export const scalaIVA = (earning, expenses) => {
    const earningIVA = calcPercentage(IVA, earning);
    const expensesIVA = calcPercentage(IVA, expenses);
    const IVAToPay = earningIVA - expensesIVA;
    return IVAToPay;
}

export const calcIRAP = (guadagno) => {
    return calcPercentage(IRAP, guadagno);
}

export const calcIRES = (guadagno) => {
    return calcPercentage(IRES, guadagno);
}

export const calcIRPEF = (guadagnoAnnuo, utileSuCuiApplicare) => {
    const percentualeIRPEF = definisciScaglione(guadagnoAnnuo);
    const IRPEF = calcPercentage(percentualeIRPEF, utileSuCuiApplicare);
    return IRPEF;
}

export const definisciScaglione = (guadagnoAnnuo) => {
    if(guadagnoAnnuo <= 15000){
        return 23;
    }else if(guadagnoAnnuo > 15000 && guadagnoAnnuo <= 28000){
        return 27;
    }else if(guadagnoAnnuo > 28000 && guadagnoAnnuo <= 55000){
        return 38;
    }else if(guadagnoAnnuo > 55000 && guadagnoAnnuo <= 75000){
        return 41;
    }else if(guadagnoAnnuo > 75000){
        return 43;
    }
}


export const societaDiPersone = (earning, expenses) => {
    const IVAToPay = scalaIVA(earning, expenses);
    console.log('IVA to pay: ' + IVAToPay);
    const guadagno = earning - expenses;
    console.log('guadagno: ' + guadagno);
    const IRAPToPay = calcIRAP(guadagno);
    console.log('IRAP to pay: ' + IRAPToPay);
    const taxes = IVAToPay + IRAPToPay;
    console.log('tot taxes to pay: ' + taxes);
    const guadagnoPuro = guadagno - taxes;
    console.log('guadagno puro: ' + guadagnoPuro);
    return {taxes: taxes, guadagnoPuro: guadagnoPuro};
}

export const societaDiCapitali = (earning, expenses) => {
    const IVAToPay = scalaIVA(earning, expenses);
    console.log('IVA to pay: ' + IVAToPay);
    const guadagno = earning - expenses;
    console.log('guadagno: ' + guadagno);
    const IRAPToPay = calcIRAP(guadagno);
    console.log('IRAP to pay: ' + IRAPToPay);
    const IRESToPay = calcIRES(guadagno - IRAPToPay);
    console.log('IRES to pay: ' + IRESToPay);
    const taxes = IVAToPay + IRAPToPay + IRESToPay;
    console.log('tot taxes to pay: ' + taxes);
    const guadagnoPuro = guadagno - taxes;
    console.log('guadagno puro: ' + guadagnoPuro);
    return {taxes: taxes, guadagnoPuro: guadagnoPuro};
}

export const partitaIVAOrdinaria = (earning, expenses) => {
    const IVAToPay = scalaIVA(earning, expenses);
    console.log('IVA to pay: ' + IVAToPay);
    const guadagno = earning - expenses;
    console.log('guadagno: ' + guadagno);
    const INPSToPay = calcPercentage(33.72, guadagno);
    console.log('INPS to pay: ' + INPSToPay);
    const IRAPToPay = calcIRAP(guadagno-INPSToPay);
    console.log('IRAP to pay: ' + IRAPToPay);
    const IRPEFToPay = calcIRPEF(guadagno, guadagno-INPSToPay-IRAPToPay);
    console.log('IRPEF to pay: ' + IRPEFToPay);
    const taxes = IVAToPay +INPSToPay - IRAPToPay - IRPEFToPay;
    console.log('tot taxes to pay: ' + taxes);
    const guadagnoPuro = guadagno - taxes;
    console.log('guadagno puro: ' + guadagnoPuro);
    return {taxes: taxes, guadagnoPuro: guadagnoPuro};
}

export const partitaIVAForfettaria = (earning, expenses) => {
    const imposta = calcPercentage(22, earning);
    console.log('imposta to pay: ' + imposta);
    const INPSToPay = calcPercentage(INPS, earning - imposta);
    console.log('INPS to pay: ' + INPSToPay);
    const impostaSostitutiva = calcPercentage(IMPOSTA_SOSTITUTIVA, earning - imposta - INPSToPay);
    console.log('imposta sostitutiva to pay: ' + impostaSostitutiva);
    if(expenses < imposta){
        const taxes = imposta + INPSToPay + impostaSostitutiva;
        console.log('tot taxes to pay: ' + taxes);
        const guadagnoPuro = earning - taxes + (imposta - expenses);
        console.log('guadagno puro: ' + guadagnoPuro);
        return {taxes: taxes, guadagnoPuro: guadagnoPuro};
    }else{
        const taxes = imposta + INPSToPay + impostaSostitutiva;
        console.log('tot taxes to pay: ' + taxes);
        const guadagnoPuro = earning - taxes - (expenses - imposta);
        console.log('guadagno puro: ' + guadagnoPuro);
        return {taxes: taxes, guadagnoPuro: guadagnoPuro};
    }
}


// fonte:
// https://www.pmi.it/impresa/contabilita-e-fisco/52519/irpef-scaglioni-e-aliquote.html