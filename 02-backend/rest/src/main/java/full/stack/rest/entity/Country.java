package full.stack.rest.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "country")
@Getter
@Setter
// TODO Try to replace @Getter and @Setter with @Data
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @Column(name = "code")
    String code;

    @Column(name = "name")
    String name;

    @OneToMany(mappedBy = "country")
    Set<State> states;
}
