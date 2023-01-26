// SPA & SRL, SRLs

export const IRES = 24;
export const IRAP = 3.9;
export const IVA = 22;
export const IMPOSTA_SOSTITUTIVA = 15;
export const INPS = 33.72;

const calcPercentage = (percentage, num) => {
    return num/100*percentage;
}

const scalaIVA = (earning, expenses) => {
    const earningIVA = calcPercentage(IVA, earning);
    const expensesIVA = calcPercentage(IVA, expenses);
    const IVAToPay = earningIVA - expensesIVA;
    return IVAToPay;
}

const calcIRAP = (guadagno) => {
    return calcPercentage(IRAP, guadagno);
}

const calcIRES = (guadagno) => {
    return calcPercentage(IRES, guadagno);
}

const calcIRPEF = (guadagnoAnnuo, utileSuCuiApplicare) => {
    if(guadagnoAnnuo <= 15000){
        return calcPercentage(23, utileSuCuiApplicare);
    }else if(guadagnoAnnuo > 15000 && guadagnoAnnuo <= 28000){
        return calcPercentage(23, 15000) + calcPercentage(27, utileSuCuiApplicare-15000);
    }else if(guadagnoAnnuo > 28000 && guadagnoAnnuo <= 55000){
        return calcPercentage(23, 15000) + calcPercentage(27, 13000) + calcPercentage(38, utileSuCuiApplicare-55000);
    }else if(guadagnoAnnuo > 55000 && guadagnoAnnuo <= 75000){
        return calcPercentage(23, 15000) + calcPercentage(27, 13000) + calcPercentage(38, 27000) + calcPercentage(41, utileSuCuiApplicare-55000);
    }else if(guadagnoAnnuo > 75000){
        return calcPercentage(23, 15000) + calcPercentage(27, 13000) + calcPercentage(38, 27000) + calcPercentage(41, 20000) + calcPercentage(43, 20000);
    }
}

const calcIRPEF_aggiornato = (guadagnoAnnuo) => {
    if(guadagnoAnnuo <= 15000){
        return calcPercentage(23, guadagnoAnnuo);
    }else if(guadagnoAnnuo > 15000 && guadagnoAnnuo <= 28000){
        return calcPercentage(23, 15000) + calcPercentage(25, guadagnoAnnuo - 15000);
    }else if(guadagnoAnnuo > 28000 && guadagnoAnnuo <= 50000){
        return calcPercentage(23, 15000) + calcPercentage(25, 13000) + calcPercentage(35, guadagnoAnnuo - 28000);
    }else if(guadagnoAnnuo > 50000){
        return calcPercentage(23, 15000) + calcPercentage(25, 13000) + calcPercentage(35, 22000) + calcPercentage(38, guadagnoAnnuo - 50000);
    }
    return 0;
}

export const societaDiPersone = (earning, expenses) => {
    const IVAToPay = scalaIVA(earning, expenses);
    const guadagno = earning - expenses;
    const IRAPToPay = calcIRAP(guadagno);
    const taxes = IVAToPay + IRAPToPay;
    const guadagnoPuro = guadagno - taxes;
    return {taxes: taxes, guadagnoPuro: guadagnoPuro};
}

export const societaDiCapitali = (earning, expenses) => {
    const IVAToPay = scalaIVA(earning, expenses);
    const guadagno = earning - expenses;
    const IRAPToPay = calcIRAP(guadagno);
    const IRESToPay = calcIRES(guadagno - IRAPToPay);
    const taxes = IVAToPay + IRAPToPay + IRESToPay;
    const guadagnoPuro = guadagno - taxes;
    return {taxes: taxes, guadagnoPuro: guadagnoPuro};
}

export const partitaIVAOrdinaria = (earning, expenses) => {
    const IVAToPay = scalaIVA(earning, expenses);
    const guadagno = earning - expenses;
    const INPSToPay = calcPercentage(33.72, guadagno);
    const IRAPToPay = calcIRAP(guadagno-INPSToPay);
    const IRPEFToPay = calcIRPEF(guadagno, guadagno-INPSToPay-IRAPToPay);
    const taxes = IVAToPay +INPSToPay - IRAPToPay - IRPEFToPay;
    const guadagnoPuro = guadagno - taxes;
    return {taxes: taxes, guadagnoPuro: guadagnoPuro};
}

export const partitaIVAForfettaria = (earning, expenses) => {
    const imposta = calcPercentage(22, earning);
    const INPSToPay = calcPercentage(INPS, earning - imposta);
    const impostaSostitutiva = calcPercentage(IMPOSTA_SOSTITUTIVA, earning - imposta - INPSToPay);
    if(expenses < imposta){
        const taxes = imposta + INPSToPay + impostaSostitutiva;
        const guadagnoPuro = earning - taxes + (imposta - expenses);
        return {taxes: taxes, guadagnoPuro: guadagnoPuro};
    }else{
        const taxes = imposta + INPSToPay + impostaSostitutiva;
        const guadagnoPuro = earning - taxes - (expenses - imposta);
        return {taxes: taxes, guadagnoPuro: guadagnoPuro};
    }
}

export const personaFisica = (earning, expenses) => {
    const taxes = calcIRPEF_aggiornato(earning);
    const guadagnoPuro = earning - taxes;
    return {taxes: taxes, guadagnoPuro: guadagnoPuro};
}


// fonte:
// https://www.pmi.it/impresa/contabilita-e-fisco/52519/irpef-scaglioni-e-aliquote.html