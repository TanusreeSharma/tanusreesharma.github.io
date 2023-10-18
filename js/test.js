this.projetsEnCours = Object(__WEBPACK_IMPORTED_MODULE_7_rxjs_observable_combineLatest__["a" /* combineLatest */])(
    [
        this.dataService.getDeparts(),
        this.dataService.getProjectsByEtat("cours"),
    ],
    function (deps, projects) {
        projects.sort((a, b) => a.annee - b.annee);

        return projects.map(p => {
            const deviprice = p.devis.toString();;

            // Fetch the amount from the devis table using the id
            this.dataService.getDevisById(deviprice).subscribe(devis => {
                const amount = devis.amount;

                const depIds = p.departMissions.map(departMission => departMission.departement);
                const depNames = deps.filter(d => depIds.includes(d._id)).map(d => d.nom).join(', ');
                return { ...p, depNames, deviprice, amount };
            });
        });
    }
).subscribe((projects) => {
    _this.projetsEnCours = projects;
    console.log('p', projects);
});





