exports.getCommitIcon = (value) => {
	// https://developer.github.com/v4/reference/enum/statusstate/
	if (!value) return undefined;
	switch (value.state) {
		case 'SUCCESS': return '$(check)';
		case 'PENDING': return '$(sync)';
		case 'FAILURE': return '$(issue-opened)';
	}
}

exports.getMergeableIcon = (value) => {
	// https://developer.github.com/v4/reference/enum/statusstate/
	switch (value) {
		case 'MERGEABLE': return '$(git-merge)';
		case 'UNKNOWN': return '$(x)';
		case 'CONFLICTING': return '$(alert)';
	}
}

exports.getPullRequestStateIcon = (value) => {
	// https://developer.github.com/v4/reference/enum/pullrequeststate/
	switch (value) {
		case 'MERGED': return '$(git-merge)';
		case 'OPEN': return '$(git-pull-request)';
		case 'CLOSED': return '$(x)';
	}
}

exports.getColor = (mergeableState) => {
	switch (mergeableState) {
		case 'MERGED':
		case 'CLOSED':
			return 'rgba(255, 0, 255, 1)';
		case 'MERGEABLE': return 'rgba(57, 255, 20, 1)';
		case 'FAILURE': return 'rgba(139, 0, 0, 1)';
		default: return 'rgba(255, 255, 255, 1)';
	}
}

exports.getMergeableState = (pr, reviews, commit, potentialMergeCommit) => {
	// https://developer.github.com/v4/reference/enum/mergeablestate/
	if (['MERGED', 'CLOSED'].includes(pr.state)) return pr.state;
	if (pr.mergeable === 'MERGEABLE' && reviews && (commit === null /* no tests defined */ || commit.state === 'SUCCESS') && potentialMergeCommit && potentialMergeCommit.status === null) return 'MERGEABLE';
	if (!reviews || commit === 'FAILURE' || pr.mergeable === 'CONFLICTING') return 'FAILURE';
	return 'OPEN';
}

exports.getStatesFilter = (showMerged, showClosed) => {
	if (showMerged && showClosed) {
		return ''; // no filter apllied
	}
	const states = ['OPEN'];
	if (showClosed) {
		states.push('CLOSED');
	}
	if (showMerged) {
		states.push('MERGED');
	}
	return `states: [${states.join(' ')}]`;
}