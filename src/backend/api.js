const apiBaseUrl = 'http://localhost:8000/api/';
// const apiBaseUrl = 'http://18.213.103.176/api/';


class APIObject {
    objectName = null;

    static async fetch(id, type) {
        const response = await fetch(apiBaseUrl + type.objectName + 's/' + id + '/');

        if (!response.ok) {
            if (response.status === 403) throw new Error(type.objectName + ' "' + id + '" not found');
            throw new Error('Bad network response');
        }

        const result = await response.json();

        return new type(result);
    }

    static async fetchAll(type) {
        const response = await fetch(apiBaseUrl + type.objectName + 's/');

        if (!response.ok) {
            if (response.status === 403) throw new Error('You must be logged in to view your ' + type.objectName + 's');
            throw new Error('Bad network response');
        }

        const result = await response.json();

        return result.map(t => new Task(t));
    }

}


export class Task extends APIObject {
    static objectName = 'task';

    constructor({ id, user, state, name, time_started, time_ended, expires, message, percent, successful }) {
        super();
        this.id = id;
        this.user_id = user;
        this.state = state;
        this.name = name;
        this.time_started = time_started ? new Date(time_started) : null;
        this.time_ended = time_ended ? new Date(time_ended) : null;
        this.expires = new Date(expires);
        this.message = message;
        this.percent = percent;
        this.successful = successful;
    }

    static async fetch(id) {
        return APIObject.fetch(id, Task);
    }

    static async fetchAll() {
        return APIObject.fetchAll(Task);
    }

    async update() {
        // Nothing should change
        if (this.state === 'SUCCESS' || this.state === 'FAILURE') return;

        const updated = await Task.fetch(this.id);
        this.state = updated.state;
        this.time_started = updated.time_started;
        this.time_ended = updated.time_ended;
        this.message = updated.message;
        this.percent = updated.percent;
        this.successful = updated.successful;
    }

    getNiceName() {
        const nameMap = {
            'api.tasks.compute_dca_task': 'Compute DCA Task',
            'api.tasks.generate_msa_task': 'Generate MSA Task',
            'api.tasks.map_residues_task': 'Map Residues Task',
            'api.tasks.generate_contacts_task': 'Generate Contacts Task',
        }
        return nameMap[this.name] || this.name;
    }
}


class APIDataObject extends APIObject {
    constructor({ id, user, created, expires }) {
        super();
        this.id = id;
        this.user_id = user;
        this.created = new Date(created);
        this.expires = new Date(expires);
    }
}


export class MSA extends APIDataObject {
    static objectName = 'msa';

    constructor({ id, user, created, expires, seed, fasta, depth, cols, quality }) {
        super({id, user, created, expires});
        this.seed = seed;
        this.fasta = fasta;
        this.depth = depth;
        this.cols = cols;
        this.quality = quality;
    }

    static async fetch(id) {
        return APIObject.fetch(id, MSA);
    }

    static async fetchAll() {
        return APIObject.fetchAll(MSA);
    }

    static testObj = new MSA({
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        user: 0,
        created: "2024-10-09T04:52:46.794Z",
        expires: "2024-10-09T04:52:46.794Z",
        seed: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        fasta: "url://my_beautiful_msa.fasta",
        depth: 1234,
        cols: 200,
        quality: 4
    })
}


export class DCA extends APIDataObject {
    static objectName = 'dca';

    constructor({ id, user, created, expires, m_eff, ranked_di }) {
        super({id, user, created, expires});
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
        return APIObject.fetch(id, DCA);
    }

    static async fetchAll() {
        return APIObject.fetchAll(DCA);
    }

    topDiPairs(n) {
        return this.ranked_di.slice(0, n).map((row) => {
            return [row[0], row[1], row[2]];
        });
    }

    static testObj = new DCA({
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        user: 0,
        created: "2024-10-09T04:54:55.148Z",
        expires: "2024-10-09T04:54:55.148Z",
        m_eff: 100,
        ranked_di: [
            [0, 1, 1.23],
            [0, 2, 1.11],
            [1, 2, 0.98]
        ]
      })
}


export class MappedDi extends APIDataObject {
    static objectName = 'mapped-di';

    constructor({ id, user, created, expires, protein_name, seed, dca, mapped_di }) {
        super({id, user, created, expires});
        this.expires = new Date(expires);
        this.protein_name = protein_name;
        this.seed = seed;
        this.dca = dca;
        this.mapped_di = mapped_di;
    }

    static async fetch(id) {
        return APIObject.fetch(id, MappedDi);
    }

    static async fetchAll() {
        return APIObject.fetchAll(MappedDi);
    }

    topDiPairs(n) {
        return this.mapped_di.slice(0, n).map((row) => {
            return [row[0], row[1], row[2]];
        });
    }

    getRange() {
        return [
            Math.min(...this.mapped_di.map(r => r[0])),
            Math.max(...this.mapped_di.map(r => r[0]))
        ];
    }

    static testObj = new MappedDi({
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        user: 0,
        created: "2024-10-09T04:54:55.148Z",
        expires: "2024-10-09T04:54:55.148Z",
        protein_name: "3rfu",
        seed: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        dca: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        mapped_di: [
            [0, 1, 1.23],
            [0, 2, 1.11],
            [1, 2, 0.98]
        ]
      })
}


export class StructureContacts extends APIDataObject {
    static objectName = 'structure-contact';

    constructor({ id, user, created, expires, pdb_id, ca_only, threshold, contacts }) {
        super({id, user, created, expires});
        this.pdb_id = pdb_id;
        this.ca_only = ca_only;
        this.threshold = threshold;
        this.contacts = contacts;
    }

    static async fetch(id) {
        return APIObject.fetch(id, StructureContacts);
    }

    static async fetchAll() {
        return APIObject.fetchAll(StructureContacts);
    }

    static testObj = new StructureContacts({
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        user: 0,
        created: "2024-10-09T04:54:55.148Z",
        expires: "2024-10-09T04:54:55.148Z",
        pdb_id: "6avj",
        ca_only: true,
        threshold: 8,
        contacts: {
            AA_contacts: [
                [55, 57],
                [67, 68],
            ]
        }})
}


async function startTask(endpoint, data) {
    const response = await fetch(apiBaseUrl + endpoint + '/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Bad network response');
    }

    const result = await response.json();

    return new Task(result);
}


export async function generateMsa(seed, msaName, ECutoff, maxGaps) {
    let data = {
        seed: seed,
        E: ECutoff,
        max_gaps: maxGaps
    };
    if (msaName) data.msa_name = msaName;

    return await startTask('generate-msa', data);
}


export async function computeDca(msaId, theta) {
    return await startTask('compute-dca', {
        msa_id: msaId,
        theta: theta
    });
}


export async function mapResidues(dcaId, pdbId, chain1, chain2) {
    return await startTask('map-residues', {
        dca_id: dcaId,
        pdb_id: pdbId,
        chain1: chain1,
        chain2: chain2
    });
}


export async function generateContacts(pdbId, caOnly, distThresh) {
    return await startTask('generate-contacts', {
        pdb_id: pdbId,
        ca_only: caOnly,
        threshold: distThresh
    });
}