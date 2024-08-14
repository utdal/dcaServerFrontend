const apiBaseUrl = 'http://18.213.103.176:8000/api/';


export class Task {
    constructor({ id, user, state, name, time_started, time_ended, expires, message, percent, successful}) {
        this.id = id;
        this.user_id = user;
        this.state = state;
        this.name = name;
        this.time_started = new Date(time_started);
        this.time_ended = new Date(time_ended);
        this.expires = new Date(expires);
        this.message = message;
        this.percent = percent;
        this.successful = successful;
    }

    static async fetch(id) {
        const response = await fetch(apiBaseUrl + 'tasks/' + id + '/');

        if (!response.ok) {
            if (response.status === 403) throw new Error('Task "' + id + '" not found');
            throw new Error('Bad network response');
        }

        const result = await response.json();

        return new Task(result);
    }

    static async fetchAll(id) {
        const response = await fetch(apiBaseUrl + 'tasks/');

        if (!response.ok) {
            if (response.status === 403) throw new Error('You must be logged in to view your tasks');
            throw new Error('Bad network response');
        }

        const result = await response.json();

        return result.map(t => new Task(t));
    }

    async update() {
        // Nothing should change
        if (this.state === 'SUCCESS' || this.state === 'FAILURE') return;

        const updated = await Task.fetch(this.id);
        this.state = updated.state;
        this.time_started = updated.time_started;
        this.time_ended = updated.time_ended;
        this.message = updated.message;
        this.percent = this.percent;
        this.successful = updated.successful;
    }

    getNiceName() {
        const nameMap = {
            'api.tasks.compute_dca_task': 'Compute DCA Task',
            'api.tasks.generate_msa_task': 'Generate MSA Task',
        }
        return nameMap[this.name] || this.name;
    }
}


export class DCA {
    constructor({ id, user, created, expires, m_eff, ranked_di }) {
        this.id = id;
        this.user_id = user;
        this.created = new Date(created);
        this.expires = new Date(expires);
        this.m_eff = m_eff;
        this.ranked_di = ranked_di;

        this.ranked_di.sort((a, b) => {
            if (a[2] === b[2]) {
                return 0;
            } else {
                return (a[2] > b[2]) ? -1 : 1;
            }
        });

        this.seq_length = Math.max(...ranked_di.map(r => r[1])) + 1;
    }

    static async fetch(id) {
        const response = await fetch(apiBaseUrl + 'dcas/' + id + '/');

        if (!response.ok) {
            if (response.status === 404) throw new Error('DCA "' + id + '" not found');
            throw new Error('Bad network response');
        }

        const result = await response.json();

        return new DCA(result);
    }

    topDiPairs(n) {
        return this.ranked_di.slice(0, n).map((row) => {
            return [row[0], row[1]];
        });
    }
}
