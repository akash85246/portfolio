import GithubActivity from '../utils/GithubActivity';
import LeetCodeActivity from '../utils/LeetCodeActivity';
function Activity() {
  return (
    <section className="next-section activity p-5" id="activity">
      <div>
        <h1 className="section-heading text-left">GITHUB</h1>
      </div>
      <GithubActivity />
      <div>
        <h1 className="section-heading text-left">LEETCODE</h1>
      </div>
      <LeetCodeActivity />
    </section>
  );
}
export default Activity;
