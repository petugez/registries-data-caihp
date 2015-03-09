angular.module('registries')
.config(['$translateProvider', function($translateProvider) {
	$translateProvider.preferredLanguage('cz');
	$translateProvider.translations('sk', {
		"menu.member.title": "Člen",
		"menu.player.title": "Hráč",
		"menu.fees.title": "Poplatok",
		"menu.referee.title": "Rozhodca",
		"menu.coach.title": "Tréner",
		"menu.event.title":"Údalosť",
		"menu.stadium.title": "Štadión",
		"menu.club.title": "Klub",
		"menu.association.title": "Zväz",
		"menu.person.title": "Osoba",
		"menu.transfer.title": "Zmena kl. príslušnosti",
		"menu.season.title": "Súťažný ročník",
		"menu.age.category.title": "Veková kategória",
		"menu.roster.title": "Súpisky",
		"menu.competition.title": "Súťaž",
		"menu.competitionPart.title":"Časť súťaže",
		"menu.schedule.title":"Termín stretnutia",
		"menu.match.title": "Stretnutie",
		"menu.delegateReport.title": "Správa delegáta",
		"menu.statistics.title":"Štatistiky",
		"menu.company.title": "Organizácia",
		"menu.my.profile.title": "Môj profil",
		"menu.permissions.title": "Oprávnenia",
		"menu.schemas.title": "Schémy",
		"menu.new.person.lower.level": "Nová osoba",
		"menu.new.company.lower.level": "Nová spoločnosť",
		"menu.search.person.lower.level": "Hľadať osobu",
		"menu.search.member.lower.level": "Hľadať člena",
		"menu.search.player.lower.level": "Hľadať hráča",
		"menu.search.officer.lower.level": "Hľadať funkcionára",
		"menu.search.referee.lower.level": "Hľadať rozhodcu",
		"menu.search.coach.lower.level": "Hľadať trénera",
		"menu.search.company.lower.level": "Hľadať spoločnosť",
		"menu.search.club.lower.level": "Hľadať klub",
		"menu.search.association.lower.level": "Hľadať zväz",
		"menu.search.statistic.lower.level": "Hľadať štatistika",
		"menu.search.medic.lower.level": "Hľadať zdravotníka",
		"menu.new.lower.level": "Nový",
		"menu.new.lower.level.he": "Nové",
		"menu.new.lower.level.she": "Nová",
		"menu.search.lower.level": "Hľadať",
		"menu.profile.lower.level": "Profil",
		"menu.change.password.lower.level": "Zmena hesla",
		"menu.new.group.lower.level": "Nová skupina",
		"menu.permission.groups.lower.level": "Skupiny oprávnení",
		"menu.user.permissions.lower.level": "Oprávnenia používateľov",
		"menu.schema.list.lower.level": "Zoznam schém",
		"menu.new.profile.lower.level":"Nový bezpečnostný profil",
		"menu.profiles.lower.level":"Hľadať bezpečnostný profil",
		"menu.statistics.title":"Štatistiky",
		"menu.statistics.show.title":"Zobraziť",
		"menu.massmailing.title":"Hromadná pošta",
		"menu.massmailing.new.lower.level":"Nový vzor",
		"menu.massmailing.search.lower.level":"Vyhľadáť",
		"menu.massmailing.send.title":"Odoslať",

		"accounting.info.user.info":"Sumárne informácie",
		"accounting.info.user.payments":"Prijaté platby",
		"accounting.info.user.fees.unpaid":"Nezaplatené poplatky",
		"accounting.info.user.fees.history":"Zaplatené poplatky",

		"accounting.info.company.fees.topay": "Poplatky k na zaplatenie",
		"accounting.info.company.fees.topay.value": "v sume",
		"accounting.info.company.fees.overdue": "Poplatky po splatnosti",
		"accounting.info.company.fees.overdue.value": "v sume",




		"schema.people.personalProfile":"Môj profil",
		"schema.people.membershipFeeInfo.title":"Členské príspevky",
		"schema.people.membershipFeeInfo.membershipType":"Typ členského príspevku",
		"schema.people.membershipFeeInfo.paymentFrequency":"Frekvencia platby",
		"schema.people.membershipFeeInfo.membershipFee":"Výška členského príspevku",
		"schema.people.membershipFeeInfo.notes":"Poznámka",

    	"schema.people.membershipFeeInfo.membershipType.extraligaUnder23":"Extraliga do 23r.",
    	"schema.people.membershipFeeInfo.membershipType.extraligaOver23":"Extraliga nad 23r.",
    	"schema.people.membershipFeeInfo.membershipType.1.NHL":"1.NHL",
    	"schema.people.membershipFeeInfo.membershipType.agent":"Agent",
    	"schema.people.membershipFeeInfo.membershipType.other":"Ostatní",

		"schema.people.membershipFeeInfo.paymentFrequency.1xyear": "1x ročne",
		"schema.people.membershipFeeInfo.paymentFrequency.2xyear": "2x ročne",
		"schema.people.membershipFeeInfo.paymentFrequency.4xyear": "4x ročne",
		"schema.people.membershipFeeInfo.paymentFrequency.12xyear": "12x ročne",

        "schema.people.hockeyPlayerInfo.positionName.forward":"Útočník",
        "schema.people.hockeyPlayerInfo.positionName.defender":"Obranca",
        "schema.people.hockeyPlayerInfo.positionName.goalkeeper":"Brankár",
        "schema.people.hockeyPlayerInfo.positionName.other":"Ostatní",

	    "schema.people.hockeyPlayerInfo.dressSize.M":"M",
	    "schema.people.hockeyPlayerInfo.dressSize.L":"L",
	    "schema.people.hockeyPlayerInfo.dressSize.XL":"XL",
	    "schema.people.hockeyPlayerInfo.dressSize.XXL":"XXL",

        "schema.people.hockeyPlayerInfo.stickHandling.left":"Ľavé",
        "schema.people.hockeyPlayerInfo.stickHandling.right":"Pravé",


		"schema.fees.title":"Príspevok",
		"schema.fees.baseData":"Základné údaje",
		"schema.fees.baseData.member":"Člen",
		"schema.fees.baseData.membershipFee":"Výška príspevku",
		"schema.fees.baseData.setupDate":"Dátum vystavenia",
		"schema.fees.baseData.variableSymbol":"Variabilný symbol",
		"schema.fees.baseData.dueDate":"Dátum splatnosti",
		"schema.fees.baseData.membershipFeePaid":"Zaplatená čiastka",
		"schema.fees.baseData.dateOfPayment":"Dátum zaplatenia",
		"schema.fees.baseData.notes":"Poznámka",
		"schema.fees.baseData.feePaymentStatus":"Stav",

		"schema.fees.baseData.feePaymentStatus.created": "Vystavený",
		"schema.fees.baseData.feePaymentStatus.refunded":"Zaplatený",
		"schema.fees.baseData.feePaymentStatus.differs":"Rozdiel",
		"schema.fees.baseData.feePaymentStatus.overdue":"Po splatnosti",
		"schema.fees.baseData.feePaymentStatus.canceled":"Zrušený",

		"schema.fees.listFields.name":"Meno",
		"schema.fees.listFields.surName":"Priezvisko",


		"schema.payments.new": "Nová platba",
		"schema.payments.search": "Platba",
		"schema.payments.view": "Platba",

		"schema.payments.baseData":"Zakladné informácie",
		"schema.payments.baseData.accountingDate": "Učtovný dátum",
		"schema.payments.baseData.amount": "Suma",
		"schema.payments.baseData.constantSymbol": "Konšt.symbol",
		"schema.payments.baseData.variableSymbol": "Var.symbol",
		"schema.payments.baseData.specificSymbol": "Špec. Symbol",
		"schema.payments.baseData.transactionMessage": "Správa",
		"schema.payments.baseData.transactionType": "Typ transakcie",
		"schema.payments.baseData.clientRef": "Klient ref.",
		"schema.payments.baseData.clientName": "Meno klienta",
		"schema.payments.baseData.bankCode": "Kod banky ",
		"schema.payments.baseData.bankRef": "Banka ref",
		"schema.payments.baseData.checksum": "Kontrolný súčet",
		"schema.payments.baseData.status": "Stav",
		"schema.payments.baseData.importId": "Ident.importu",
		"schema.payments.baseData.fee":"Poplatok",
		"schema.payments.listFields.accountingDate":"Učtovný dátum",
		"schema.payments.listFields.clientName":"Meno klienta",
		"schema.payments.listFields.variableSymbol":"Var.symbol",
		"schema.payments.listFields.amount":"Suma",
		"schema.payments.listFields.status":"Stav",



		"schema.mailTemplate.basedata.title":"Základné údaje",
		"schema.mailTemplate.basedata.name":"Názov vzoru",
		"schema.mailTemplate.basedata.subject":"Predmet vzoru",
		"schema.mailTemplate.basedata.text":"Text vzoru",
		"schema.mailTemplate.basedata.html":"HTML vzor",
		"schema.mailTemplate.listFields.title":"Názov vzoru",

		"schema.people.isActivePartner":"Je aktívny partner",
        "schema.people.isActivePartner.yes":"Áno",
        "schema.people.isActivePartner.no":"Nie",
		"schema.people.isActivePlayer":"Je aktívny hráč",
		"schema.people.isActivePlayer.yes":"Áno",
		"schema.people.isActivePlayer.no":"Nie",
		"schema.people.isActiveCoach":"Je aktívny tréner",
		"schema.people.isActiveCoach.yes":"Áno",
		"schema.people.isActiveCoach.no":"Nie",
		"schema.people.isActiveAgent":"Je aktívny agent",
		"schema.people.isActiveAgent.yes":"Áno",
		"schema.people.isActiveAgent.no":"Nie",
		"schema.people.isActiveRepresentative":"Je aktívny funkcionár",
		"schema.people.isActiveRepresentative.yes":"Áno",
		"schema.people.isActiveRepresentative.no":"Nie",
		"schema.people.isProAm":"Je PRO-AM",
		"schema.people.isProAm.yes":"Áno",
		"schema.people.isProAm.no":"Nie",
		"schema.people.hockeyPlayerInfo.category":"Kategórie sútaže",
    	"schema.people.hockeyPlayerInfo.category.extraliga":"Extraliga",
    	"schema.people.hockeyPlayerInfo.category.nhl":"1.NHL",
    	"schema.people.hockeyPlayerInfo.category.foreign":"Zahraničie",
    	"schema.people.hockeyPlayerInfo.dressSize":"Veľkosť",
    	"schema.people.hockeyPlayerInfo.footSize":"Veľkosť topánky",
    	"schema.people.hockeyPlayerInfo.registredAgentName":"Meno registrovaného agenta",
		"schema.people.hockeyPlayerInfo.nonregisteredAgentName":"Meno neregistrovaného agenta",
		"schema.people.stateOfPerson":"Status",
		"schema.people.stateOfPerson.active":"Aktívny",
		"schema.people.stateOfPerson.inactive":"Neaktívny",
		"schema.fees.view":"Členský príspevok",
		"schema.fees.search":"Členský príspevok",

		"schema.imports.new": "Novy import",
		"schema.imports.search": "Import",
		"schema.imports.view": "Import",
		"schema.imports.baseData": "Zakladne informacie",
		"schema.imports.file": "Súbor",
		"schema.imports.type": "Typ súboru",
		"schema.imports.author": "Importoval",
		"schema.imports.createdOn":"Dátum importu",

		"schema.mailTemplate.basedata.name":"Názov vzoru",
		"schema.mailTemplate.basedata.subject":"Predment správy",
		"schema.mailTemplate.basedata.text":"Text správy(plaintext)",
		"schema.mailTemplate.basedata.html":"Text správy(html)",


		"schema.org.new":"Nová organizácia",
		"schema.org.title":"Organizácia",
		"schema.org.baseData":"Zakladné informácie",
		"schema.people.title":"Člen",
		"schema.org.baseData.name": "Názov organizácie",
		"schema.org.listFields.id": "ID",
		"schema.org.listFields.name": "Meno",
		"schema.people.listFields.surName":"Priezvisko",
		"schema.people.listFields.name":"Meno",
		"schema.people.listFields.id":"Registračné číslo",
		"schema.people.baseData": "Základné informácie",
		"schema.people.baseData.identifier": "Identifikátor",
		"schema.people.baseData.bornNumber":"Rodné číslo",
		"schema.people.baseData.name": "Meno",
		"schema.people.baseData.surName": "Priezvisko",
		"schema.people.baseData.bornName": "Rodné priezvisko",
		'schema.people.baseData.title': 'Titul',
		'schema.people.baseData.birthDate': 'Dátum narodenia',
		'schema.people.baseData.nationality': 'Štátna príslušnoť',
		'schema.people.baseData.gender': 'Pohlavie',
		"schema.people.photoInfo":"Fotografie",
		"schema.people.photoInfo.photo":"Fotografia",
		"schema.people.contactInfo":"Kontaktné údaje",
		"schema.people.contactInfo.street":"Ulica",
		"schema.people.contactInfo.houseNumber":"Číslo domu",
		"schema.people.contactInfo.city":"Obec",
		"schema.people.contactInfo.zipCode":"PSČ",
		"schema.people.contactInfo.country":"Štát",
		"schema.people.contactInfo.phoneNumber":"Telefón",
		"schema.people.contactInfo.mobileNumber":"Mobil",
		"schema.people.contactInfo.mobileNumber2":"Mobil 2",
		"schema.people.contactInfo.email":"E-mail",
		"schema.people.contactInfo.email2":"E-mail 2",
		"schema.people.bankInfo":"Bankové spojenie",
		"schema.people.bankInfo.bankAccount":"Číslo účtu",
		"schema.people.bankInfo.bankCode":"Kód banky",
		"schema.people.bankInfo.iban":"IBAN",
		"schema.people.bankInfo.swift":"SWIFT",
		"schema.people.hockeyPlayerInfo":"Profil hráča",
		"schema.people.hockeyPlayerInfo.clubName":"Názov klubu",
		"schema.people.hockeyPlayerInfo.positionName":"Post",
		"schema.people.hockeyPlayerInfo.nickName":"Prezývka",
		"schema.people.hockeyPlayerInfo.dressNumber":"Číslo dresu",
		"schema.people.hockeyPlayerInfo.playerHeight":"Výška",
		"schema.people.hockeyPlayerInfo.playerWeight":"Hmotnosť",
		"schema.people.hockeyPlayerInfo.stickHandling":"Držanie hokejky",
		"schema.people.hockeyPlayerInfo.contractDate":"Zmluva zo dňa",
		"schema.people.otherInfo":"Ostatné údaje",
		"schema.people.otherInfo.isPhotoPublic":"Je fotka verejná",
		"schema.people.otherInfo.idCardNumber":"Číslo OP",
		"schema.people.otherInfo.membershipStartDate":"Člen od",
		"schema.people.otherInfo.membershipEndDate":"Člen do",
		"schema.people.otherInfo.note":"Poznámka",

		"menu.fees.new.lower.level" : "Novy poplatok",
		"menu.fees.search.lower.level" : "Hladat poplatok",
		"menu.imports.lower.level":"Hladat import",
		"menu.imports.new.lower.level":"Novy import",
		"menu.payments.new.lower.level":"Nova Platba",
		"menu.payments.lower.level":"Hladat platbu",

		"schema.group.listFields.id":"ID",
		"schema.group.listFields.name":"Názov skupiny",
		"schema.groupmaster.new":"Nová skupina",
		"schema.group.baseData":"Základné údaje",
		"schema.group.baseData.id":"Identifikátor",
		"schema.group.baseData.name":"Názov skupiny",
		"schema.group.baseData.parent":"Rodič",

		"schema.security.listFields.name":"Názov profilu",
		"schema.security.baseData.name":"Názov profilu",
		"schema.security.baseData":"Základné údaje",

		"schema.securityMaster.new":"Nový bezpečnostný profil"
	});

	$translateProvider.translations('cz', {
		"enum.boolean.true":"Ano",
		"enum.boolean.false":"Ne",

		"menu.member.title": "Člen",
		"menu.player.title": "Hráč",
		"menu.fees.title": "Poplatek",
		"menu.referee.title": "Rozhodca",
		"menu.coach.title": "Tréner",
		"menu.stadium.title": "Štadión",
		"menu.event.title":"Údalosť",
		"menu.club.title": "Klub",
		"menu.association.title": "Zväz",
		"menu.person.title": "Osoba",
		"menu.transfer.title": "Zmena kl. príslušnosti",
		"menu.season.title": "Súťažný ročník",
		"menu.age.category.title": "Veková kategória",
		"menu.roster.title": "Súpisky",
		"menu.competition.title": "Súťaž",
		"menu.competitionPart.title":"Časť súťaže",
		"menu.schedule.title":"Termín stretnutia",
		"menu.match.title": "Stretnutie",
		"menu.delegateReport.title": "Správa delegáta",
		"menu.company.title": "Organizace",
		"menu.my.profile.title": "Můj profil",
		"menu.permissions.title": "Oprávnění",
		"menu.schemas.title": "Schémata",
		"menu.new.person.lower.level": "Nová osoba",
		"menu.new.company.lower.level": "Nová společnosť",
		"menu.search.person.lower.level": "Hledat osobu",
		"menu.search.member.lower.level": "Hledat člena",
		"menu.search.player.lower.level": "Hledat hráča",
		"menu.search.officer.lower.level": "Hledat funkcionára",
		"menu.search.referee.lower.level": "Hledat rozhodcu",
		"menu.search.statistic.lower.level": "Hledat statistika",
		"menu.search.medic.lower.level": "Hledat zdravotníka",
		"menu.search.coach.lower.level": "Hledat trenéra",
		"menu.search.company.lower.level": "Hledat spoločnosť",
		"menu.search.club.lower.level": "Hledat klub",
		"menu.search.association.lower.level": "Hledat zväz",
		"menu.new.lower.level": "Nový",
		"menu.new.lower.level.he": "Nové",
		"menu.new.lower.level.she": "Nová",
		"menu.search.lower.level": "Hledat",
		"menu.profile.lower.level": "Profil",
		"menu.change.password.lower.level": "Změna hesla",
		"menu.new.group.lower.level": "Nová skupina",
		"menu.permission.groups.lower.level": "Skupiny oprávnění",
		"menu.user.permissions.lower.level": "Oprávnění uživatelů",
		"menu.schema.list.lower.level": "Seznam schémat",
		"menu.new.profile.lower.level":"Nový bezpečnostní profil",
		"menu.profiles.lower.level":"Hledat bezpečnostní profil",
		"menu.statistics.title":"Statistiky",
		"menu.statistics.show.title":"Zobrazit",
		"menu.massmailing.title":"Hromadní pošta",
		"menu.massmailing.new.lower.level":"Nový vzor",
		"menu.massmailing.search.lower.level":"Vyhledat vzor",
		"menu.massmailing.send.title":"Odeslat",

		"accounting.info.user.info":"Sumárne informace",
		"accounting.info.user.payments":"Přijaté platby",
		"accounting.info.user.fees.unpaid":"Nezaplacené poplatky",
		"accounting.info.user.fees.history":"Zaplacené poplatky",
		"accounting.info.club.user.status":"Bilance členú",
		"accounting.info.company.fees.topay": "Poplatky k zaplaceni",
		"accounting.info.company.fees.topay.value": "v sume",
		"accounting.info.company.fees.overdue": "Poplatky po splatnosti",
		"accounting.info.company.fees.overdue.value": "v sume",




		"schema.mailTemplate.basedata.name":"Název šablony",
		"schema.mailTemplate.basedata.subject":"Predment mailu",

		"schema.mailTemplate.basedata.text":"Telo - plaintext",
		"schema.mailTemplate.basedata.html":"Telo - html",

		"schema.people.personalProfile":"Můj profil",
		"schema.people.membershipFeeInfo.title":"Členské příspěvky",
		"schema.people.membershipFeeInfo.membershipType":"Typ členského příspěvku",
		"schema.people.membershipFeeInfo.paymentFrequency":"Frekvence platby",
		"schema.people.membershipFeeInfo.membershipFee":"Výše členského příspěvku",
		"schema.people.membershipFeeInfo.notes":"Poznámka",

    	"schema.people.membershipFeeInfo.membershipType.extraligaUnder23":"Extraliga do 23r.",
    	"schema.people.membershipFeeInfo.membershipType.extraligaOver23":"Extraliga nad 23r.",
    	"schema.people.membershipFeeInfo.membershipType.1.NHL":"1.NHL",
    	"schema.people.membershipFeeInfo.membershipType.agent":"Agent",
    	"schema.people.membershipFeeInfo.membershipType.other":"Ostatní",

		"schema.people.membershipFeeInfo.paymentFrequency.1xyear": "1x ročne",
		"schema.people.membershipFeeInfo.paymentFrequency.2xyear": "2x ročne",
		"schema.people.membershipFeeInfo.paymentFrequency.12xyear": "12x ročne",

        "schema.people.hockeyPlayerInfo.positionName.forward":"Útočník",
        "schema.people.hockeyPlayerInfo.positionName.defender":"Obránce",
        "schema.people.hockeyPlayerInfo.positionName.goalkeeper":"Brankár",
        "schema.people.hockeyPlayerInfo.positionName.other":"Ostatní",

	    "schema.people.hockeyPlayerInfo.dressSize.M":"M",
	    "schema.people.hockeyPlayerInfo.dressSize.L":"L",
	    "schema.people.hockeyPlayerInfo.dressSize.XL":"XL",
	    "schema.people.hockeyPlayerInfo.dressSize.XXL":"XXL",

        "schema.people.hockeyPlayerInfo.stickHandling.left":"Levé",
        "schema.people.hockeyPlayerInfo.stickHandling.right":"Pravé",


		"schema.fees.title":"Poplatek",
		"schema.fees.view":"Poplatek",
		"schema.fees.search":"Poplatek",
		"schema.fees.baseData":"Základní údaje",
		"schema.fees.baseData.member":"Člen",
		"schema.fees.baseData.membershipFee":"Výše poplatku",
		"schema.fees.baseData.setupDate":"Datum vystavení",
		"schema.fees.baseData.variableSymbol":"Variabilní symbol",
		"schema.fees.baseData.dueDate":"Datum splatnosti",
		"schema.fees.baseData.membershipFeePaid":"Zaplacená částka",
		"schema.fees.baseData.dateOfPayment":"Datum zaplacení",
		"schema.fees.baseData.notes":"Poznámka",
		"schema.fees.baseData.feePaymentStatus":"Stav",



		"schema.fees.baseData.feePaymentStatus.created": "Vytvorený",
		"schema.fees.baseData.feePaymentStatus.refunded":"Zaplatený",
		"schema.fees.baseData.feePaymentStatus.differs":"Rozdiel",
		"schema.fees.baseData.feePaymentStatus.overdue":"Po splatnosti",
		"schema.fees.baseData.feePaymentStatus.canceled":"Zrušený",


		"schema.fees.listFields.name":"Jméno",
		"schema.fees.listFields.surName":"Příjmení",

		"schema.payments.new": "Nová platba",
		"schema.payments.search": "Platba",
		"schema.payments.view": "Platba",

		"schema.payments.baseData":"Zakladní informace",
		"schema.payments.baseData.accountingDate": "Učtovní datum",
		"schema.payments.baseData.amount": "Suma",
		"schema.payments.baseData.constantSymbol": "Konšt.symbol",
		"schema.payments.baseData.variableSymbol": "Var.symbol",
		"schema.payments.baseData.specificSymbol": "Špec. symbol",
		"schema.payments.baseData.transactionMessage": "Zpráva",
		"schema.payments.baseData.transactionType": "Typ transakce",
		"schema.payments.baseData.clientRef": "Klient ref.",
		"schema.payments.baseData.clientName": "Meno klienta",
		"schema.payments.baseData.bankCode": "Kód banky ",
		"schema.payments.baseData.bankRef": "Banka ref",
		"schema.payments.baseData.checksum": "Kontrolní součet",
		"schema.payments.baseData.status": "Stav",
		"schema.payments.baseData.importId": "Ident.importu",
		"schema.payments.baseData.fee":"Poplatek",
		"schema.payments.listFields.accountingDate":"Učtovní datum",
		"schema.payments.listFields.clientName":"Jméno klienta",
		"schema.payments.listFields.variableSymbol":"Var.symbol",
		"schema.payments.listFields.amount":"Suma",
		"schema.payments.listFields.status":"Stav",


		"schema.mailTemplate.basedata.title":"Základné údaje",
		"schema.mailTemplate.basedata.name":"Názov vzoru",
		"schema.mailTemplate.basedata.subject":"Predmet vzoru",
		"schema.mailTemplate.basedata.text":"Text vzoru",
		"schema.mailTemplate.basedata.html":"HTML vzor",
		"schema.mailTemplate.listFields.title":"Názov vzoru",


		"schema.people.isActivePartner":"Je aktivní partner",
        "schema.people.isActivePartner.yes":"Áno",
        "schema.people.isActivePartner.no":"Ne",
		"schema.people.isActivePlayer":"Je aktivní hráč",
		"schema.people.isActivePlayer.yes":"Áno",
		"schema.people.isActivePlayer.no":"Ne",
		"schema.people.isActiveCoach":"Je aktivní trenér",
		"schema.people.isActiveCoach.yes":"Áno",
		"schema.people.isActiveCoach.no":"Ne",
		"schema.people.isActiveAgent":"Je aktivní agent",
		"schema.people.isActiveAgent.yes":"Áno",
		"schema.people.isActiveAgent.no":"Ne",
		"schema.people.isActiveRepresentative":"Je aktivní funkcionár",
		"schema.people.isActiveRepresentative.yes":"Áno",
		"schema.people.isActiveRepresentative.no":"Ne",
		"schema.people.isProAm":"Je PRO-AM",
		"schema.people.isProAm.yes":"Áno",
		"schema.people.isProAm.no":"Ne",
		"schema.people.hockeyPlayerInfo.category":"Kategorie soutěže",
    	"schema.people.hockeyPlayerInfo.category.extraliga":"Extraliga",
    	"schema.people.hockeyPlayerInfo.category.nhl":"1.NHL",
    	"schema.people.hockeyPlayerInfo.category.foreign":"Zahraničie",
    	"schema.people.hockeyPlayerInfo.dressSize":"Velikost",
    	"schema.people.hockeyPlayerInfo.footSize":"Číslo boty",
    	"schema.people.hockeyPlayerInfo.registredAgentName":"Jméno registrovaného agenta",
		"schema.people.hockeyPlayerInfo.nonregisteredAgentName":"Jméno neregistrovaného agenta",
		"schema.people.stateOfPerson":"Status",
		"schema.people.stateOfPerson.active":"Aktivní",
		"schema.people.stateOfPerson.inactive":"Neaktivní",
		"schema.fees.view":"Členský príspevok",
		"schema.fees.search":"Členský príspevok",

		"schema.imports.new": "Nový import",
		"schema.imports.search": "Import",
		"schema.imports.view": "Import",

		"schema.imports.baseData": "Zakladní informace",
		"schema.imports.file": "Soubor",
		"schema.imports.type": "Typ souboru",
		"schema.imports.author": "Vytvořil",
		"schema.imports.createdOn":"Datum importu",

		"schema.mailTemplate.basedata.name":"Název vzoru",
		"schema.mailTemplate.basedata.subject":"Předmět zprávy",
		"schema.mailTemplate.basedata.text":"Text zprávy(plaintext)",
		"schema.mailTemplate.basedata.html":"Text zprávy(html)",

		"schema.org.new":"Nová organizace",
		"schema.org.title":"Organizace",
		"schema.org.baseData":"Zakladní informace",
		"schema.people.title":"Člen",
		"schema.org.baseData.name": "Název organizace",
		"schema.org.listFields.id": "ID",
		"schema.org.listFields.name": "Jméno",
		"schema.people.listFields.surName":"Příjmení",
		"schema.people.listFields.name":"Jméno",
		"schema.people.listFields.id":"Registračné číslo",
		'schema.people.baseData': 'Základní informace',
		'schema.people.baseData.identifier': 'Identifikátor',
		'schema.people.baseData.name': 'Jméno',
		'schema.people.baseData.surName': 'Příjmení',
		'schema.people.baseData.bornName': 'Rodné příjmení',
		"schema.people.baseData.bornNumber":"Rodné číslo",
		'schema.people.baseData.title': 'Titul',
		'schema.people.baseData.birthDate': 'Datum narození',
		'schema.people.baseData.nationality': 'Státni příslušnost',
		'schema.people.baseData.gender': 'Pohlaví',
		"schema.people.photoInfo":"Fotografie",
		"schema.people.photoInfo.photo":"Fotografie",
		"schema.people.contactInfo":"Kontaktní údaje",
		"schema.people.contactInfo.street":"Ulice",
		"schema.people.contactInfo.houseNumber":"Číslo domu",
		"schema.people.contactInfo.city":"Obec",
		"schema.people.contactInfo.zipCode":"PSČ",
		"schema.people.contactInfo.country":"Stát",
		"schema.people.contactInfo.phoneNumber":"Telefon",
		"schema.people.contactInfo.mobileNumber":"Mobil",
		"schema.people.contactInfo.mobileNumber2":"Mobil 2",
		"schema.people.contactInfo.email":"E-mail",
		"schema.people.contactInfo.email2":"E-mail 2",
		"schema.people.bankInfo":"Bankovní spojení",
		"schema.people.bankInfo.bankAccount":"Číslo účtu",
		"schema.people.bankInfo.bankCode":"Kód banky",
		"schema.people.bankInfo.iban":"IBAN",
		"schema.people.bankInfo.swift":"SWIFT",
		"schema.people.hockeyPlayerInfo":"Profil hráče",
		"schema.people.hockeyPlayerInfo.clubName":"Název klubu",
		"schema.people.hockeyPlayerInfo.positionName":"Post",
		"schema.people.hockeyPlayerInfo.nickName":"Přezdívka",
		"schema.people.hockeyPlayerInfo.dressNumber":"Číslo dresu",
		"schema.people.hockeyPlayerInfo.playerHeight":"Výška",
		"schema.people.hockeyPlayerInfo.playerWeight":"Hmotnost",
		"schema.people.hockeyPlayerInfo.stickHandling":"Držení hole",
		"schema.people.hockeyPlayerInfo.contractDate":"Smlouva ze dne",
		"schema.people.otherInfo":"Ostatní údaje",
		"schema.people.otherInfo.isPhotoPublic":"Je fotka veřejná",
		"schema.people.otherInfo.idCardNumber":"Číslo OP",
		"schema.people.otherInfo.membershipStartDate":"Člen od",
		"schema.people.otherInfo.membershipEndDate":"Člen do",
		"schema.people.otherInfo.note":"Poznámka",

		"menu.fees.new.lower.level" : "Nový poplatek",
		"menu.fees.search.lower.level" : "Hledat poplatek",
		"menu.imports.lower.level":"Hledat import",
		"menu.imports.new.lower.level":"Nový import",
		"menu.payments.new.lower.level":"Nova platba",
		"menu.payments.lower.level":"Hledat platbu",

		"schema.group.listFields.id":"ID",
		"schema.group.listFields.name":"Název skupiny",
		"schema.groupmaster.new":"Nová skupina",
		"schema.group.baseData":"Základní údaje",
		"schema.group.baseData.id":"Identifikátor",
		"schema.group.baseData.name":"Název skupiny",
		"schema.group.baseData.parent":"Rodič",

		"schema.security.listFields.name":"Název profilu",
		"schema.security.baseData.name":"Název profilu",
		"schema.security.baseData":"Základní údaje",

		"schema.securityMaster.title":"Bezpečnostní profil"
	});

	$translateProvider.translations('eng', {
		"enum.boolean.true":"Yes",
		"enum.boolean.false":"No",

		"menu.member.title": "Member",
		"menu.player.title": "Player",
		"menu.fees.title": "Fee",
		"menu.referee.title": "Referee",
		"menu.coach.title": "Coach",
		"menu.stadium.title": "Stadium",
		"menu.event.title":"Event",
		"menu.club.title": "Club",
		"menu.association.title": "Association",
		"menu.person.title": "Osoba",
		"menu.transfer.title": "Zmena kl. príslušnosti",
		"menu.season.title": "Súťažný ročník",
		"menu.age.category.title": "Veková kategória",
		"menu.roster.title": "Súpisky",
		"menu.competition.title": "Súťaž",
		"menu.competitionPart.title":"Časť súťaže",
		"menu.schedule.title":"Termín stretnutia",
		"menu.match.title": "Stretnutie",
		"menu.delegateReport.title": "Správa delegáta",
		"menu.company.title": "Company",
		"menu.my.profile.title": "My profile",
		"menu.permissions.title": "Oprávnění",
		"menu.schemas.title": "Schémata",
		"menu.new.person.lower.level": "Nová osoba",
		"menu.new.company.lower.level": "Nová společnosť",
		"menu.search.person.lower.level": "Hledat osobu",
		"menu.search.member.lower.level": "Hledat člena",
		"menu.search.player.lower.level": "Hledat hráča",
		"menu.search.officer.lower.level": "Hledat funkcionára",
		"menu.search.referee.lower.level": "Hledat rozhodcu",
		"menu.search.statistic.lower.level": "Hledat statistika",
		"menu.search.medic.lower.level": "Hledat zdravotníka",
		"menu.search.coach.lower.level": "Hledat trenéra",
		"menu.search.company.lower.level": "Hledat spoločnosť",
		"menu.search.club.lower.level": "Hledat klub",
		"menu.search.association.lower.level": "Hledat zväz",
		"menu.new.lower.level": "Nový",
		"menu.new.lower.level.he": "Nové",
		"menu.new.lower.level.she": "Nová",
		"menu.search.lower.level": "Hledat",
		"menu.profile.lower.level": "Profil",
		"menu.change.password.lower.level": "Změna hesla",
		"menu.new.group.lower.level": "Nová skupina",
		"menu.permission.groups.lower.level": "Skupiny oprávnění",
		"menu.user.permissions.lower.level": "Oprávnění uživatelů",
		"menu.schema.list.lower.level": "Seznam schémat",
		"menu.new.profile.lower.level":"Nový bezpečnostní profil",
		"menu.profiles.lower.level":"Hledat bezpečnostní profil",
		"menu.statistics.title":"Statistiky",
		"menu.statistics.show.title":"Zobrazit",
		"menu.massmailing.title":"Hromadní pošta",
		"menu.massmailing.new.lower.level":"Nový vzor",
		"menu.massmailing.search.lower.level":"Vyhledat vzor",
		"menu.massmailing.send.title":"Odeslat",

		"accounting.info.user.info":"Sumárne informace",
		"accounting.info.user.payments":"Přijaté platby",
		"accounting.info.user.fees.unpaid":"Nezaplacené poplatky",
		"accounting.info.user.fees.history":"Zaplacené poplatky",
		"accounting.info.club.user.status":"Bilance členú",
		"accounting.info.company.fees.topay": "Poplatky k zaplaceni",
		"accounting.info.company.fees.topay.value": "v sume",
		"accounting.info.company.fees.overdue": "Poplatky po splatnosti",
		"accounting.info.company.fees.overdue.value": "v sume",



		"schema.mailTemplate.basedata.name":"Název šablony",
		"schema.mailTemplate.basedata.subject":"Predment mailu",

		"schema.mailTemplate.basedata.text":"Telo - plaintext",
		"schema.mailTemplate.basedata.html":"Telo - html",

		"schema.people.personalProfile":"Můj profil",
		"schema.people.membershipFeeInfo.title":"Členské příspěvky",
		"schema.people.membershipFeeInfo.membershipType":"Typ členského příspěvku",
		"schema.people.membershipFeeInfo.paymentFrequency":"Frekvence platby",
		"schema.people.membershipFeeInfo.membershipFee":"Výše členského příspěvku",
		"schema.people.membershipFeeInfo.notes":"Poznámka",

    	"schema.people.membershipFeeInfo.membershipType.extraligaUnder23":"Extraliga do 23r.",
    	"schema.people.membershipFeeInfo.membershipType.extraligaOver23":"Extraliga nad 23r.",
    	"schema.people.membershipFeeInfo.membershipType.1.NHL":"1.NHL",
    	"schema.people.membershipFeeInfo.membershipType.agent":"Agent",
    	"schema.people.membershipFeeInfo.membershipType.other":"Ostatní",

		"schema.people.membershipFeeInfo.paymentFrequency.1xyear": "1x ročne",
		"schema.people.membershipFeeInfo.paymentFrequency.2xyear": "2x ročne",
		"schema.people.membershipFeeInfo.paymentFrequency.12xyear": "12x ročne",

        "schema.people.hockeyPlayerInfo.positionName.forward":"Útočník",
        "schema.people.hockeyPlayerInfo.positionName.defender":"Obránce",
        "schema.people.hockeyPlayerInfo.positionName.goalkeeper":"Brankár",
        "schema.people.hockeyPlayerInfo.positionName.other":"Ostatní",

	    "schema.people.hockeyPlayerInfo.dressSize.M":"M",
	    "schema.people.hockeyPlayerInfo.dressSize.L":"L",
	    "schema.people.hockeyPlayerInfo.dressSize.XL":"XL",
	    "schema.people.hockeyPlayerInfo.dressSize.XXL":"XXL",

        "schema.people.hockeyPlayerInfo.stickHandling.left":"Levé",
        "schema.people.hockeyPlayerInfo.stickHandling.right":"Pravé",


		"schema.fees.title":"Poplatek",
		"schema.fees.view":"Poplatek",
		"schema.fees.search":"Poplatek",
		"schema.fees.baseData":"Základní údaje",
		"schema.fees.baseData.member":"Člen",
		"schema.fees.baseData.membershipFee":"Výše poplatku",
		"schema.fees.baseData.setupDate":"Datum vystavení",
		"schema.fees.baseData.variableSymbol":"Variabilní symbol",
		"schema.fees.baseData.dueDate":"Datum splatnosti",
		"schema.fees.baseData.membershipFeePaid":"Zaplacená částka",
		"schema.fees.baseData.dateOfPayment":"Datum zaplacení",
		"schema.fees.baseData.notes":"Poznámka",
		"schema.fees.baseData.feePaymentStatus":"Stav",



		"schema.fees.baseData.feePaymentStatus.created": "Vytvorený",
		"schema.fees.baseData.feePaymentStatus.refunded":"Zaplatený",
		"schema.fees.baseData.feePaymentStatus.differs":"Rozdiel",
		"schema.fees.baseData.feePaymentStatus.overdue":"Po splatnosti",
		"schema.fees.baseData.feePaymentStatus.canceled":"Zrušený",


		"schema.fees.listFields.name":"Jméno",
		"schema.fees.listFields.surName":"Příjmení",

		"schema.payments.new": "Nová platba",
		"schema.payments.search": "Platba",
		"schema.payments.view": "Platba",

		"schema.payments.baseData":"Zakladní informace",
		"schema.payments.baseData.accountingDate": "Učtovní datum",
		"schema.payments.baseData.amount": "Suma",
		"schema.payments.baseData.constantSymbol": "Konšt.symbol",
		"schema.payments.baseData.variableSymbol": "Var.symbol",
		"schema.payments.baseData.specificSymbol": "Špec. symbol",
		"schema.payments.baseData.transactionMessage": "Zpráva",
		"schema.payments.baseData.transactionType": "Typ transakce",
		"schema.payments.baseData.clientRef": "Klient ref.",
		"schema.payments.baseData.clientName": "Meno klienta",
		"schema.payments.baseData.bankCode": "Kód banky ",
		"schema.payments.baseData.bankRef": "Banka ref",
		"schema.payments.baseData.checksum": "Kontrolní součet",
		"schema.payments.baseData.status": "Stav",
		"schema.payments.baseData.importId": "Ident.importu",
		"schema.payments.baseData.fee":"Poplatek",
		"schema.payments.listFields.accountingDate":"Učtovní datum",
		"schema.payments.listFields.clientName":"Jméno klienta",
		"schema.payments.listFields.variableSymbol":"Var.symbol",
		"schema.payments.listFields.amount":"Suma",
		"schema.payments.listFields.status":"Stav",


		"schema.mailTemplate.basedata.title":"Základné údaje",
		"schema.mailTemplate.basedata.name":"Názov vzoru",
		"schema.mailTemplate.basedata.subject":"Predmet vzoru",
		"schema.mailTemplate.basedata.text":"Text vzoru",
		"schema.mailTemplate.basedata.html":"HTML vzor",
		"schema.mailTemplate.listFields.title":"Názov vzoru",


		"schema.people.isActivePartner":"Je aktivní partner",
        "schema.people.isActivePartner.yes":"Áno",
        "schema.people.isActivePartner.no":"Ne",
		"schema.people.isActivePlayer":"Je aktivní hráč",
		"schema.people.isActivePlayer.yes":"Áno",
		"schema.people.isActivePlayer.no":"Ne",
		"schema.people.isActiveCoach":"Je aktivní trenér",
		"schema.people.isActiveCoach.yes":"Áno",
		"schema.people.isActiveCoach.no":"Ne",
		"schema.people.isActiveAgent":"Je aktivní agent",
		"schema.people.isActiveAgent.yes":"Áno",
		"schema.people.isActiveAgent.no":"Ne",
		"schema.people.isActiveRepresentative":"Je aktivní funkcionár",
		"schema.people.isActiveRepresentative.yes":"Áno",
		"schema.people.isActiveRepresentative.no":"Ne",
		"schema.people.isProAm":"Je PRO-AM",
		"schema.people.isProAm.yes":"Áno",
		"schema.people.isProAm.no":"Ne",
		"schema.people.hockeyPlayerInfo.category":"Kategorie soutěže",
    	"schema.people.hockeyPlayerInfo.category.extraliga":"Extraliga",
    	"schema.people.hockeyPlayerInfo.category.nhl":"1.NHL",
    	"schema.people.hockeyPlayerInfo.category.foreign":"Zahraničie",
    	"schema.people.hockeyPlayerInfo.dressSize":"Velikost",
    	"schema.people.hockeyPlayerInfo.footSize":"Číslo boty",
    	"schema.people.hockeyPlayerInfo.registredAgentName":"Jméno registrovaného agenta",
		"schema.people.hockeyPlayerInfo.nonregisteredAgentName":"Jméno neregistrovaného agenta",
		"schema.people.stateOfPerson":"Status",
		"schema.people.stateOfPerson.active":"Aktivní",
		"schema.people.stateOfPerson.inactive":"Neaktivní",
		"schema.fees.view":"Členský príspevok",
		"schema.fees.search":"Členský príspevok",

		"schema.imports.new": "Nový import",
		"schema.imports.search": "Import",
		"schema.imports.view": "Import",

		"schema.imports.baseData": "Zakladní informace",
		"schema.imports.file": "Soubor",
		"schema.imports.type": "Typ souboru",
		"schema.imports.author": "Vytvořil",
		"schema.imports.createdOn":"Datum importu",

		"schema.mailTemplate.basedata.name":"Název vzoru",
		"schema.mailTemplate.basedata.subject":"Předmět zprávy",
		"schema.mailTemplate.basedata.text":"Text zprávy(plaintext)",
		"schema.mailTemplate.basedata.html":"Text zprávy(html)",

		"schema.org.new":"Nová organizace",
		"schema.org.title":"Organizace",
		"schema.org.baseData":"Zakladní informace",
		"schema.people.title":"Člen",
		"schema.org.baseData.name": "Název organizace",
		"schema.org.listFields.id": "ID",
		"schema.org.listFields.name": "Jméno",
		"schema.people.listFields.surName":"Příjmení",
		"schema.people.listFields.name":"Jméno",
		"schema.people.listFields.id":"Registračné číslo",
		'schema.people.baseData': 'Základní informace',
		'schema.people.baseData.identifier': 'Identifikátor',
		'schema.people.baseData.name': 'Jméno',
		'schema.people.baseData.surName': 'Příjmení',
		'schema.people.baseData.bornName': 'Rodné příjmení',
		"schema.people.baseData.bornNumber":"Rodné číslo",
		'schema.people.baseData.title': 'Titul',
		'schema.people.baseData.birthDate': 'Datum narození',
		'schema.people.baseData.nationality': 'Státni příslušnost',
		'schema.people.baseData.gender': 'Pohlaví',
		"schema.people.photoInfo":"Fotografie",
		"schema.people.photoInfo.photo":"Fotografie",
		"schema.people.contactInfo":"Kontaktní údaje",
		"schema.people.contactInfo.street":"Ulice",
		"schema.people.contactInfo.houseNumber":"Číslo domu",
		"schema.people.contactInfo.city":"Obec",
		"schema.people.contactInfo.zipCode":"PSČ",
		"schema.people.contactInfo.country":"Stát",
		"schema.people.contactInfo.phoneNumber":"Telefon",
		"schema.people.contactInfo.mobileNumber":"Mobil",
		"schema.people.contactInfo.mobileNumber2":"Mobil 2",
		"schema.people.contactInfo.email":"E-mail",
		"schema.people.contactInfo.email2":"E-mail 2",
		"schema.people.bankInfo":"Bankovní spojení",
		"schema.people.bankInfo.bankAccount":"Číslo účtu",
		"schema.people.bankInfo.bankCode":"Kód banky",
		"schema.people.bankInfo.iban":"IBAN",
		"schema.people.bankInfo.swift":"SWIFT",
		"schema.people.hockeyPlayerInfo":"Profil hráče",
		"schema.people.hockeyPlayerInfo.clubName":"Název klubu",
		"schema.people.hockeyPlayerInfo.positionName":"Post",
		"schema.people.hockeyPlayerInfo.nickName":"Přezdívka",
		"schema.people.hockeyPlayerInfo.dressNumber":"Číslo dresu",
		"schema.people.hockeyPlayerInfo.playerHeight":"Výška",
		"schema.people.hockeyPlayerInfo.playerWeight":"Hmotnost",
		"schema.people.hockeyPlayerInfo.stickHandling":"Držení hole",
		"schema.people.hockeyPlayerInfo.contractDate":"Smlouva ze dne",
		"schema.people.otherInfo":"Ostatní údaje",
		"schema.people.otherInfo.isPhotoPublic":"Je fotka veřejná",
		"schema.people.otherInfo.idCardNumber":"Číslo OP",
		"schema.people.otherInfo.membershipStartDate":"Člen od",
		"schema.people.otherInfo.membershipEndDate":"Člen do",
		"schema.people.otherInfo.note":"Poznámka",

		"menu.fees.new.lower.level" : "Nový poplatek",
		"menu.fees.search.lower.level" : "Hledat poplatek",
		"menu.imports.lower.level":"Hledat import",
		"menu.imports.new.lower.level":"Nový import",
		"menu.payments.new.lower.level":"Nova platba",
		"menu.payments.lower.level":"Hledat platbu",

		"schema.group.listFields.id":"ID",
		"schema.group.listFields.name":"Název skupiny",
		"schema.groupmaster.new":"Nová skupina",
		"schema.group.baseData":"Základní údaje",
		"schema.group.baseData.id":"Identifikátor",
		"schema.group.baseData.name":"Název skupiny",
		"schema.group.baseData.parent":"Rodič",

		"schema.security.listFields.name":"Název profilu",
		"schema.security.baseData.name":"Název profilu",
		"schema.security.baseData":"Základní údaje",

		"schema.securityMaster.title":"Bezpečnostní profil"
	});
}]);
