import HashtagItem from './HashtagItem';

type HashtagListProps = {
  companyList: string[];
  handleSelectCompany: (company: string) => void;
};

export default function HashtagList({
  companyList,
  handleSelectCompany,
}: HashtagListProps) {
  return (
    <ul className='hashtags'>
      {companyList.map((company, i) => (
        <HashtagItem
          key={`${company}-${i}`}
          company={company}
          onSelectCompany={handleSelectCompany}
        />
      ))}
    </ul>
  );
}
