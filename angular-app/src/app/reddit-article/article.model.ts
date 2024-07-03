export class Article{
  title: string;
  link: string;
  votes: number;

  constructor(title: string, link: string, votes?: number) {
    this.title = title;
    this.link = link;
    this.votes = votes || 0; // defaults to zero
  }

  voteUp(){
    ++this.votes;
  }
  voteDown(){
    --this.votes;
  }

  // Add a utility function to extract the domain from the url
  domain(): string | null {
    try {
      // e.g. http://foo.com/path/to/bar
      const domainAndPath: string = this.link.split('//')[1];
      // e.g. foo.com/path/to/bar
      return domainAndPath.split('/')[0];
    }
    catch (err) {
      return null;
    }
  }
}
