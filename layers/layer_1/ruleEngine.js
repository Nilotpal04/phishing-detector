/*
Rule Engine : Controller of layer_1

Order of execution :

1. Whitelist (skip everything)
2. Blacklist (instant block)
3. URL Rules
4. Domain Rules

Final Output:
SAFE
PHISHING
SUSPICIOUS
*/

import { isWhitelisted } from "./01_whitelist.js";
import { isBlacklisted } from "./02_blacklist.js";
import { checkUrlRules } from "./03_urlRules.js";
import { checkDomainRules } from "./04_domainRules.js";

export async function runRuleEngine(url, domain) {

    /*
    STEP 1: Whitelist Check

    If domain is trusted, allow immediately.
    */
    if (await isWhitelisted(domain)) {

        return { status: "safe" };

    }

    /*
    STEP 2: Blacklist Check

    If domain is known phishing, block immediately.
    */
    if (await isBlacklisted(domain)) {

        return { status: "phishing" };

    }


    /*
    STEP 3: URL Analysis
    */
    const urlResult = checkUrlRules(url);

    /*
    STEP 4: Domain Analysis
    */

    const domainResult = checkDomainRules(domain);

    /*
    If any rule strongly indicates phishing
    */

    if (urlResult.block || domainResult.block) {

        return { status: "phishing" };

    }

    /*
    If rules detect suspicious patterns
    */

    if (urlResult.suspicious || domainResult.suspicious) {

        return { status: "suspicious" };

    }

    
    //Otherwise treat as safe
    return { status: "safe" };
}