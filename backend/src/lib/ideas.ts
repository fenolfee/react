import _ from "lodash";

export const ideas = _.times(100, (i) => ({
    nick: `cool-idea-nick-${i + 1}`,
    title: `Idea ${i + 1}`,
    description: `Description of idea ${i + 1}...`,
    text: _.times(100, (j) => `<p>Text paragrph ${j + 1} of idea ${i + 1}</p>`).join(''),
}))
