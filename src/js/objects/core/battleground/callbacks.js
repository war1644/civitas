/**
 * Internal callback for when someone wins the battleground.
 *
 * @private
 * @param {Object} winner
 * @param {Object} winner
 * @returns {civitas.objects.battleground}
 */
civitas.objects.battleground.prototype._on_win = function(winner, loser) {
	var my_settlement = this.core().get_settlement(winner.city);
	var settlement = this.core().get_settlement(loser.city);
	if (this._attack.city === winner.city) {
		// player was attacking and won.
		settlement.army = settlement.load_army(loser.army);
		settlement.navy = settlement.load_navy(loser.navy);
		var spoils = settlement.get_spoils();
		this.core().add_to_queue(settlement, my_settlement, civitas.ACTION_CAMPAIGN, civitas.CAMPAIGN_ARMY_RETURN, {
			army: winner.army,
			navy: winner.navy,
			resources: spoils
		});
	} else if (this._defense.city === winner.city) {
		// player was defending and won.
		my_settlement.army = my_settlement.load_army(winner.army);
		my_settlement.navy = my_settlement.load_navy(winner.navy);
		var has_loser_army = settlement.has_army(loser.army);
		var has_loser_navy = settlement.has_navy(loser.navy);
		if (has_loser_army > 0 || has_loser_navy > 0) {
			this.core().add_to_queue(my_settlement, settlement, civitas.ACTION_CAMPAIGN, civitas.CAMPAIGN_ARMY_RETURN, {
				army: loser.army,
				navy: loser.navy,
				resources: {}
			});
		}
	}
	return this;
};

/**
 * Internal callback for when someone loses the battleground.
 *
 * @private
 * @param {Object} winner
 * @param {Object} winner
 * @returns {civitas.objects.battleground}
 */
civitas.objects.battleground.prototype._on_lose = function(winner, loser) {
	var settlement = this.core().get_settlement(winner.city);
	var my_settlement = this.core().get_settlement(loser.city);
	if (this._attack.city === loser.city) {
		// player was attacking and lost.
		settlement.army = settlement.load_army(winner.army);
		settlement.navy = settlement.load_navy(winner.navy);
		var has_loser_army = settlement.has_army(loser.army);
		var has_loser_navy = settlement.has_navy(loser.navy);
		if (has_loser_army > 0 || has_loser_navy > 0) {
			this.core().add_to_queue(settlement, my_settlement, civitas.ACTION_CAMPAIGN, civitas.CAMPAIGN_ARMY_RETURN, {
				army: loser.army,
				navy: loser.navy,
				resources: {}
			});
		}
	} else if (this._defense.city === loser.city) {
		// player was defending and lost.
		my_settlement.army = my_settlement.load_army(loser.army);
		my_settlement.navy = my_settlement.load_navy(loser.navy);
		var spoils = my_settlement.get_spoils();
		this.core().add_to_queue(my_settlement, settlement, civitas.ACTION_CAMPAIGN, civitas.CAMPAIGN_ARMY_RETURN, {
			army: winner.army,
			navy: winner.navy,
			resources: spoils
		});
	}
	return this;
};
